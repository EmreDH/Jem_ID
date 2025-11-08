using BackEnd.Classes;
using BackEnd.Data;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/products")]
public class AanvoerderController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public AanvoerderController(ApplicationDbContext context) => _context = context;

    [Authorize(Roles = "Aanvoerder,Admin")]
    [HttpPost("addproduct")]
    public async Task<IActionResult> Create([FromBody] AanvoerderItemCreateDTO dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Potmaat) && string.IsNullOrWhiteSpace(dto.Steellengte))
            return BadRequest(new { message = "Vul potmaat of steellengte in" });

        var userId = User.GetUserId();
        if (userId is null) return Unauthorized(new { message = "Geen geldige token" });

        var aanvoerder = await _context.Aanvoerders.FirstOrDefaultAsync(a => a.UserId == userId.Value);
        if (aanvoerder is null)
        {
            aanvoerder = new Aanvoerder { UserId = userId.Value };
            _context.Aanvoerders.Add(aanvoerder);
            await _context.SaveChangesAsync();
        }

        var item = new AanvoerItem
        {
            AanvoerderId = aanvoerder.Id,
            FotoUrl = dto.FotoUrl.Trim(),
            Soort = dto.Soort.Trim(),
            Potmaat = string.IsNullOrWhiteSpace(dto.Potmaat) ? null : dto.Potmaat.Trim(),
            Steellengte = string.IsNullOrWhiteSpace(dto.Steellengte) ? null : dto.Steellengte.Trim(),
            Hoeveelheid = dto.Hoeveelheid,
            MinimumPrijs = dto.MinimumPrijs,
            GewensteKloklocatie = dto.GewensteKloklocatie,
            Veildatum = dto.Veildatum
        };

        _context.AanvoerItems.Add(item);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Veilingitem succesvol toegevoegd", id = item.Id });
    }

    [Authorize(Roles = "Aanvoerder,Admin")]
    [HttpGet("showaddedproducts")]
    public async Task<IActionResult> Mine([FromQuery] DateOnly date)
    {
        if (date == default)
            return BadRequest(new { message = "Parameter date is verplicht (yyyy-MM-dd)." });


        var userId = User.GetUserId();
        if (userId is null) return Unauthorized(new { message = "Geen geldige token" });

        var aanvoerderId = await _context.Aanvoerders
            .Where(a => a.UserId == userId.Value)
            .Select(a => a.Id)
            .FirstOrDefaultAsync();

        if (aanvoerderId == 0)
            return NotFound(new { message = "De aanvoeritems zijn niet beschikbaar omdat de veiling is verlopen." });

        var items = await _context.AanvoerItems
            .Where(i => i.AanvoerderId == aanvoerderId && i.Veildatum == date)
            .OrderBy(i => i.Id)
            .Select(i => new
            {
                i.Id,
                i.FotoUrl,
                i.Soort,
                i.Potmaat,
                i.Steellengte,
                i.Hoeveelheid,
                i.MinimumPrijs,
                GewensteKloklocatie = i.GewensteKloklocatie.ToString(),
                i.Veildatum
            })
            .ToListAsync();

        return Ok(items);
    }
}
