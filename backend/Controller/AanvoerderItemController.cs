using Microsoft.AspNetCore.Mvc;
using BackEnd.Classes;
using BackEnd.Data; // jouw DbContext namespace
using System.Threading.Tasks;

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
    public async Task<IActionResult> CreateAanvoerderItem([FromBody] AanvoerderItemCreateDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var entity = new AanvoerderItem
        {
            FotoUrl = dto.FotoUrl,
            Naam_Product = dto.Naam_Product,
            Soort = dto.Soort,
            Potmaat = dto.Potmaat,
            Steellengte = dto.Steellengte,
            Hoeveelheid = dto.Hoeveelheid,
            MinimumPrijs = dto.MinimumPrijs,
            GewensteKloklocatie = dto.GewensteKloklocatie,
            Veildatum = dto.Veildatum
        };

        _context.AanvoerderItems.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Product opgeslagen!", id = entity.Id });
    }
}
