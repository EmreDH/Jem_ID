public class AuctionDetailDTO
{
    public int Id { get; set; }
    public int AanvoerderItemId { get; set; }

    // Product info
    public string Naam_Product { get; set; } = string.Empty;
    public string FotoUrl { get; set; } = string.Empty;
    public string Soort { get; set; } = string.Empty;
    public string? Potmaat { get; set; }
    public string? Steellengte { get; set; }
    public int Hoeveelheid { get; set; }
    public string Kloklocatie { get; set; } = string.Empty;
    public string AanvoerderName { get; set; } = string.Empty;

    public string KorteBeschrijving { get; set; } = string.Empty;

    public decimal StartPrijs { get; set; }
    public decimal MinimalePrijs { get; set; }
    public decimal StapBedrag { get; set; }
    public int StapSeconden { get; set; }
    public DateTime StartTijdUtc { get; set; }

    public bool IsGesloten { get; set; }
    public string? WinnaarNaam { get; set; }
    public decimal? WinnendePrijs { get; set; }
}
