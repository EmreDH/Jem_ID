using Microsoft.AspNetCore.Mvc;
using BackEnd.Classes;
using BackEnd.Data;
using System.Security.Claims;
using System.Threading.Tasks;
using BackEnd.DTOs;

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
        // ✅ 1. Extract logged-in user's ID from JWT
        var userIdClaim = User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub)
                          ?? User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
            return Unauthorized("Geen geldig token gevonden.");

        int aanvoerderId = int.Parse(userIdClaim.Value);

        // ✅ 2. Handle the uploaded file
        if (foto != null)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, foto.FileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await foto.CopyToAsync(stream);

            dto.FotoUrl = filePath; // or generate a URL if needed
        }

        try
        {
            // ✅ 3. Map DTO to entity and assign AanvoerderId
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

            // ✅ 4. Save to database
            _context.AanvoerderItems.Add(entity);
            await _context.SaveChangesAsync();

            // ✅ 5. Return success
            return Ok(new { message = "Product opgeslagen!", id = entity.Id });
        }
        catch (Exception ex)
        {
            // ✅ 6. Return detailed error for debugging
            return StatusCode(500, new
            {
                error = "Er is iets misgegaan bij het opslaan van het product.",
                details = ex.Message,
                inner = ex.InnerException?.Message
            });
        }
    }
}
