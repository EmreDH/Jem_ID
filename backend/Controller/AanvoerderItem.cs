using System.ComponentModel.DataAnnotations;
using BackEnd.Classes;


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
    public object Opbrengst { get; internal set; }
    public KlokLocatie GewensteKloklocatie { get; set; }
    public DateOnly Veildatum { get; set; }

    // ✅ Foreign key (primitive type)
    public int AanvoerderId { get; set; }

    // ✅ Navigation property (reference type)
    public Aanvoerder Aanvoerder { get; set; } = null!;
}
