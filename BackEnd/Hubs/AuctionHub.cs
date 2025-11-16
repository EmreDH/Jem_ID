using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BackEnd.Hubs
{
    public class AuctionHub : Hub
    {
        // Broadcast bid updates to all connected clients
        public async Task SendBidUpdate(int auctionId, decimal newPrice, string bidder)
        {
            await Clients.All.SendAsync("ReceiveBidUpdate", auctionId, newPrice, bidder);
        }
    }
}
