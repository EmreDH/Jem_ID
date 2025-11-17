using BackEnd.Classes;
using BackEnd.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuctionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ================================
        // START AUCTION
        // ================================
        [Authorize(Roles = "Veilingmeester,Admin")]
        [HttpPost("start/{aanvoerderItemId:int}")]
        public async Task<IActionResult> Start(int aanvoerderItemId)
        {
            var item = await _context.AanvoerItems
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == aanvoerderItemId);

            if (item == null)
                return NotFound(new { message = "Item niet gevonden" });

            var already = await _context.AuctionItems
                .AnyAsync(a => a.AanvoerderItemId == aanvoerderItemId && !a.IsClosed);

            if (already)
                return Conflict(new { message = "Voor dit item is er al een veiling gestart" });

            var now = DateTime.UtcNow;

            var auction = new AuctionItem
            {
                AanvoerderItemId = item.Id,
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

        // ================================
        // GET ACTIVE AUCTION
        // ================================
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveAuction()
        {
            var activeAuction = await _context.AuctionItems
                .Include(a => a.AanvoerderItem)
                .Where(a => !a.IsClosed)
                .OrderByDescending(a => a.StartTimeUtc)
                .FirstOrDefaultAsync();

            if (activeAuction == null)
                return NotFound(new { message = "Geen actieve veiling gevonden." });

            return Ok(new
            {
                auctionId = activeAuction.Id,
                productId = activeAuction.AanvoerderItemId,
                productName = activeAuction.AanvoerderItem.Naam_Product,
                description = activeAuction.AanvoerderItem.Soort,
                fotoUrl = activeAuction.AanvoerderItem.FotoUrl,
                hoeveelheid = activeAuction.AanvoerderItem.Hoeveelheid,
                minimumPrijs = activeAuction.AanvoerderItem.MinimumPrijs,
                currentPrice = activeAuction.CurrentPrice,
                startTimeUtc = activeAuction.StartTimeUtc,
                endTimeUtc = activeAuction.EndTimeUtc,
                isClosed = activeAuction.IsClosed
            });
        }
    }
}
