using BackEnd.Classes;

public class AanvoerderItemListDTO
{
    public int Id { get; set; }
    public string Naam_Product{ get; set; }
    public string FotoUrl { get; set; } = string.Empty;
    public string Soort { get; set; } = string.Empty;
    public string? Potmaat { get; set; }
    public string? Steellengte { get; set; }
    public int Hoeveelheid { get; set; }
    public decimal MinimumPrijs { get; set; }
    public string GewensteKloklocatie { get; set; } = string.Empty;
    public DateOnly Veildatum { get; set; }
    public int AanvoerderId { get; set; }
    public string AanvoerderName { get; set; } = string.Empty;
}