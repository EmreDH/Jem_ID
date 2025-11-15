using BackEnd.Classes;
using BackEnd.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/auction")]
public class AuctionController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public AuctionController(ApplicationDbContext context) => _context = context;

    [Authorize(Roles = "Veilingmeester,Admin")]
    [HttpPost("start/{aanvoerderItemId:int}")]
    public async Task<IActionResult> Start(int aanvoerderItemId)
    {
        // ✅ Gebruik de juiste DbSet-naam uit ApplicationDbContext
        var item = await _context.AanvoerderItems
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == aanvoerderItemId);

        if (item is null)
            return NotFound(new { message = "Item niet gevonden" });

        // ✅ Controleer of er al een veiling gestart is voor dit item
        var already = await _context.AuctionItems
            .AnyAsync(a => a.AanvoerItemId == aanvoerderItemId);

        if (already)
            return Conflict(new { message = "Voor dit item is er al een veiling gestart" });

        var now = DateTime.UtcNow;
        var auction = new AuctionItem
        {
            AanvoerItemId = item.Id,
            StartTimeUtc = now,
            EndTimeUtc = now.AddMinutes(2),
            CurrentPrice = item.MinimumPrijs,
            IsClosed = false
        };

        _context.AuctionItems.Add(auction);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Veiling gestart",
            auctionId = auction.Id,
            startTimeUtc = auction.StartTimeUtc,
            endTimeUtc = auction.EndTimeUtc,
            currentPrice = auction.CurrentPrice
        });
    }
}
