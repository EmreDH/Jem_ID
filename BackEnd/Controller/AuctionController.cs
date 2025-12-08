using BackEnd.Classes;
using BackEnd.Data;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;

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

        [Authorize(Roles = "veilingmeester,admin")]
        [HttpPost("start/{id:int}")]
        public async Task<IActionResult> StartAuction(int id)
        {
            var item = await _context.AanvoerItems.FindAsync(id);
            if (item == null)
                return NotFound("Product niet gevonden.");

            var auction = await _context.AuctionItems
                .FirstOrDefaultAsync(a => a.AanvoerItemId == id);

            if (auction == null)
            {
                auction = new AuctionItem
                {
                    AanvoerItemId = id
                };
                _context.AuctionItems.Add(auction);
            }

            auction.StartPrice = item.MinimumPrijs;
            auction.CurrentPrice = item.MinimumPrijs;
            auction.StartTimeUtc = DateTime.UtcNow;
            auction.EndTimeUtc = DateTime.UtcNow.AddSeconds(20);
            auction.IsFinished = false;

            await _context.SaveChangesAsync();
            return Ok(auction);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAuction(int id)
        {
            var auction = await _context.AuctionItems
                .Include(a => a.AanvoerderItem)
                .FirstOrDefaultAsync(a => a.AanvoerItemId == id);

            if (auction == null)
                return NotFound();

            if (!auction.IsFinished)
            {
                var elapsedMs = (DateTime.UtcNow - auction.StartTimeUtc).TotalMilliseconds;

                var decrease = (decimal)(elapsedMs / 100.0) * 0.02m;
                var newPrice = Math.Max(0, auction.StartPrice - decrease);

                auction.CurrentPrice = newPrice;

                if (newPrice <= 0)
                {
                    auction.IsFinished = true;
                    auction.FinalPrice = 0;
                    await _context.SaveChangesAsync();
                    return Ok(auction);
                }
            }

            return Ok(auction);
        }

        [HttpPost("bid/{id}")]
        public async Task<IActionResult> Bid(int id)
        {
            var auction = await _context.AuctionItems
                .FirstOrDefaultAsync(a => a.AanvoerItemId == id);

            if (auction == null)
                return NotFound();

            if (auction.IsFinished)
                return BadRequest("Veiling is al afgelopen.");

            var elapsedMs = (DateTime.UtcNow - auction.StartTimeUtc).TotalMilliseconds;
            var decrease = (decimal)(elapsedMs / 100.0) * 0.02m;

            var livePrice = Math.Max(0, auction.StartPrice - decrease);

            auction.IsFinished = true;
            auction.FinalPrice = livePrice;
            auction.CurrentPrice = livePrice;

            await _context.SaveChangesAsync();
            return Ok(auction);
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveAuctions()
        {
            var auctions = await _context.AuctionItems
                .Include(a => a.AanvoerderItem)
                .Where(a => !a.IsFinished)
                .OrderBy(a => a.StartTimeUtc)
                .Select(a => new
                {
                    id = a.Id,
                    productId = a.AanvoerItemId,
                    naam = a.AanvoerderItem.Naam_Product,
                    soort = a.AanvoerderItem.Soort,
                    fotoUrl = a.AanvoerderItem.FotoUrl,
                    minimumPrijs = a.AanvoerderItem.MinimumPrijs,
                    currentPrice = a.CurrentPrice,
                    kloklocatie = a.AanvoerderItem.GewensteKlokLocatie.ToString()
                })
                .ToListAsync();

            return Ok(auctions);
        }


        [HttpGet("detail/{auctionId:int}")]
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

                IsGesloten = auction.IsFinished,
                WinnaarNaam = null,
                WinnendePrijs = null
            };

            return Ok(dto);
        }
    }
}
