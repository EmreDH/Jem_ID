public class AuctionItem
{
    public int Id { get; set; }

    public int AanvoerItemId { get; set; }
    public AanvoerderItem AanvoerderItem { get; set; } = null!;

    public decimal StartPrice { get; set; }
    public decimal CurrentPrice { get; set; }
    public decimal FinalPrice { get; set; }

    public DateTime StartTimeUtc { get; set; }
    public DateTime EndTimeUtc { get; set; }

    public bool IsFinished { get; set; }
}
