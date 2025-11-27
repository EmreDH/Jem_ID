using BackEnd.Classes;
using BackEnd.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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

       
        [HttpPost("start/{id}")]
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

        
        [HttpGet("{id}")]
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
    }
}
