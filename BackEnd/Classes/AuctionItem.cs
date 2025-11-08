namespace BackEnd.Classes;

public class AuctionItem
{
    public int Id { get; set; }

    public int AanvoerItemId { get; set; }
    public AanvoerItem AanvoerItem { get; set; } = null!;

    public DateTime StartTimeUtc { get; set; }
    public DateTime EndTimeUtc { get; set; }

    public decimal CurrentPrice { get; set; }
    public int? CurrentLeaderId { get; set; }
    public User? CurrentLeader { get; set; }

    public bool IsClosed { get; set; }
    public decimal? FinalPrice { get; set; }
    public int? BuyerId { get; set; }
    public User? Buyer { get; set; }
}
