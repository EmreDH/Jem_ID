using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BackEnd.Classes;
using BackEnd.Data;
using BackEnd.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

[ApiController]
[Route("api/[controller]")]
[Authorize] // ✅ LOCKED: login required by default
public class AanvoerderItemController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AanvoerderItemController(ApplicationDbContext context)
    {
        _context = context;
    }

    // ✅ Only Aanvoerder + Admin can create items
    [Authorize(Roles = "aanvoerder,admin")]
    [HttpPost]
    public async Task<IActionResult> CreateAanvoerderItem([FromForm] AanvoerderItemCreateDTO dto, IFormFile? foto)
    {
        if (dto == null)
            return BadRequest("Ongeldige input.");

        var userIdClaim =
            User.FindFirst(JwtRegisteredClaimNames.Sub)
            ?? User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
            return Unauthorized("Geen geldig token gevonden.");

        if (!int.TryParse(userIdClaim.Value, out var userId))
            return Unauthorized("Ongeldig token (user id).");

        int aanvoerderId;

        // ✅ Admin can create for any Aanvoerder if AanvoerderId provided
        if (User.IsInRole("admin") && dto.AanvoerderId.HasValue)
        {
            aanvoerderId = dto.AanvoerderId.Value;

            var exists = await _context.Aanvoerders.AnyAsync(a => a.Id == aanvoerderId);
            if (!exists)
                return BadRequest("AanvoerderId bestaat niet.");
        }
        else
        {
            // ✅ Aanvoerder: map UserId -> Aanvoerder.Id
            var aanvoerder = await _context.Aanvoerders
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.UserId == userId);

            if (aanvoerder == null)
                return Forbid("Je bent geen aanvoerder.");

            aanvoerderId = aanvoerder.Id;
        }

        // ✅ Handle foto upload
        if (foto != null)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            Directory.CreateDirectory(uploadsFolder);

            var safeFileName = Path.GetFileName(foto.FileName);
            var filePath = Path.Combine(uploadsFolder, safeFileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await foto.CopyToAsync(stream);

            dto.FotoUrl = $"/uploads/{safeFileName}";
        }

        try
        {
            var entity = new AanvoerderItem
            {
                AanvoerderId = aanvoerderId,
                FotoUrl = dto.FotoUrl,
                Naam_Product = dto.Naam_Product,
                Soort = dto.Soort,
                Potmaat = dto.Potmaat,
                Steellengte = dto.Steellengte,
                Hoeveelheid = dto.Hoeveelheid,
                MinimumPrijs = dto.MinimumPrijs,
                GewensteKlokLocatie = dto.GewensteKlokLocatie,
                Veildatum = dto.Veildatum
            };

            _context.AanvoerItems.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product opgeslagen!", id = entity.Id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                error = "Er is iets misgegaan bij het opslaan van het product.",
                details = ex.Message,
                inner = ex.InnerException?.Message
            });
        }
    }

    // ✅ Logged-in viewers only
    [Authorize(Roles = "klant,veilingmeester,admin")]
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var p = await _context.AanvoerItems
            .Include(x => x.Aanvoerder)
                .ThenInclude(a => a.User)
            .Where(x => x.Id == id)
            .Select(x => new AanvoerderItemListDTO
            {
                Id = x.Id,
                Naam_Product = x.Naam_Product,
                FotoUrl = x.FotoUrl,
                Soort = x.Soort,
                Potmaat = x.Potmaat,
                Steellengte = x.Steellengte,
                Hoeveelheid = x.Hoeveelheid,
                MinimumPrijs = x.MinimumPrijs,
                GewensteKloklocatie = x.GewensteKlokLocatie.ToString(),
                Veildatum = x.Veildatum,
                AanvoerderId = x.AanvoerderId,
                AanvoerderName = x.Aanvoerder.User.Name
            })
            .FirstOrDefaultAsync();

        if (p == null)
            return NotFound();

        return Ok(p);
    }

    // ✅ LOCKED (per your "locked" choice)
    [Authorize(Roles = "klant,veilingmeester,admin")]
    [HttpGet("upcoming-products")]
    public IActionResult GetUpcomingProducts([FromQuery] string? location)
    {
        try
        {
            var productsQuery = _context.AanvoerItems
                .Include(p => p.Aanvoerder)
                    .ThenInclude(a => a.User)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(location))
            {
                if (Enum.TryParse<KlokLocatie>(location, out var klokLocatieEnum))
                {
                    productsQuery = productsQuery.Where(p => p.GewensteKlokLocatie == klokLocatieEnum);
                }
                else
                {
                    return BadRequest("Ongeldige kloklocatie.");
                }
            }

            productsQuery = productsQuery
                .Where(p => p.Veildatum > DateOnly.FromDateTime(DateTime.Now))
                .OrderBy(p => p.Veildatum);

            var productsDTO = productsQuery
                .Select(p => new AanvoerderItemListDTO
                {
                    Id = p.Id,
                    FotoUrl = p.FotoUrl,
                    Naam_Product = p.Naam_Product,
                    Soort = p.Soort,
                    Potmaat = p.Potmaat,
                    Steellengte = p.Steellengte,
                    Hoeveelheid = p.Hoeveelheid,
                    MinimumPrijs = p.MinimumPrijs,
                    GewensteKloklocatie = p.GewensteKlokLocatie.ToString(),
                    Veildatum = p.Veildatum,
                    AanvoerderId = p.AanvoerderId,
                    AanvoerderName = p.Aanvoerder.User.Name
                })
                .ToList();

            return Ok(productsDTO);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                error = "Er is iets misgegaan bij het ophalen van de producten.",
                details = ex.Message,
                inner = ex.InnerException?.Message
            });
        }
    }
}
