using BackEnd.Classes;
using BackEnd.Data;
using BackEnd.DTOs;
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
                .AnyAsync(a => a.AanvoerItemId == aanvoerderItemId && !a.IsClosed);

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
                productId = activeAuction.AanvoerItemId,
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

        [HttpGet("{auctionId:int}")]
        public async Task<ActionResult<AuctionDetailDTO>> GetAuctionDetail(int auctionId)
        {
            var auction = await _context.AuctionItems
                .Include(a => a.AanvoerderItem)
                    .ThenInclude(ai => ai.Aanvoerder)
                        .ThenInclude(av => av.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == auctionId);

            if (auction == null)
                return NotFound(new { message = "Veiling niet gevonden." });

            var item = auction.AanvoerderItem;

            // 1. Minimale prijs uit product
            decimal minPrice = item.MinimumPrijs;

            // 2. Start = min + 50% marge
            decimal startPrice = Math.Round(minPrice * 2m, 2); // 50% marge

            var dto = new AuctionDetailDTO
            {
                Id = auction.Id,
                AanvoerderItemId = item.Id,
                Naam_Product = item.Naam_Product,
                FotoUrl = item.FotoUrl,
                Soort = item.Soort,
                Potmaat = item.Potmaat,
                Steellengte = item.Steellengte,
                Hoeveelheid = item.Hoeveelheid,
                Kloklocatie = item.GewensteKlokLocatie.ToString(),
                AanvoerderName = item.Aanvoerder.User.Name,
                KorteBeschrijving = item.Soort,

                StartPrijs = startPrice,
                MinimalePrijs = minPrice,
                StapBedrag = 0.05m,     // zakt met 0.05
                StapSeconden = 1,       // elke 2 seconden (demo)
                StartTijdUtc = auction.StartTimeUtc,

                IsGesloten = auction.IsClosed,
                WinnaarNaam = null,
                WinnendePrijs = null
            };

            return Ok(dto);
        }
    }
}