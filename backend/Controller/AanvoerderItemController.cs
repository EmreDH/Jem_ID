using Microsoft.AspNetCore.Mvc;
using BackEnd.Classes;
using BackEnd.Data;
using System.Security.Claims;
using BackEnd.DTOs;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AanvoerderItemController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AanvoerderItemController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAanvoerderItem([FromForm] AanvoerderItemCreateDTO dto, IFormFile foto)
    {
        var userIdClaim = User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub)
                          ?? User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
            return Unauthorized("Geen geldig token gevonden.");

        int aanvoerderId = int.Parse(userIdClaim.Value);

        if (foto != null)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = Path.GetFileName(foto.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await foto.CopyToAsync(stream);

            dto.FotoUrl = $"/uploads/{fileName}";
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

    [HttpGet("upcoming-products")]
    public IActionResult GetUpcomingProducts([FromQuery] string? location)
    {
        try
        {
            var productsQuery = _context.AanvoerItems
                .Include(p => p.Aanvoerder)
                .ThenInclude(a => a.User)
                .AsQueryable();


            // Alleen filteren als er een locatie is gekozen
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

            foreach (var p in productsQuery) { Console.WriteLine($"ItemId: {p.Id}, AanvoerderId: {p.AanvoerderId}, User: {p.Aanvoerder?.User?.Name}"); }

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
