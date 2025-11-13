using System.ComponentModel.DataAnnotations;
using BackEnd.Classes;

// voor pull//
public enum KlokLocatie
    {
        Naaldwijk,
        Aalsmeer,
        Rijnsburg,
        Eelde
    }

public class AanvoerderItem
{
    [Key]
    public int Id { get; set; }

    public string FotoUrl { get; set; } = string.Empty;
    public string Naam_Product { get; set; } = string.Empty;
    public string Soort { get; set; } = string.Empty;
    public string? Potmaat { get; set; }
    public string? Steellengte { get; set; }
    public int Hoeveelheid { get; set; }
    public decimal MinimumPrijs { get; set; }
    public decimal Opbrengst { get; internal set; }
    public KlokLocatie GewensteKloklocatie { get; set; }
    public DateOnly Veildatum { get; set; }

    
    public int AanvoerderId { get; set; }

    
    public Aanvoerder Aanvoerder { get; set; } = null!;
}
