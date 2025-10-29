using System.ComponentModel.DataAnnotations;
using BackEnd.Classes;
public class AanvoerderItemCreateDTO
{
    [Required] public string FotoUrl { get; set; } = string.Empty;
    [Required] public string Naam_Product { get; set; } = string.Empty;
    [Required] public string Soort { get; set; } = string.Empty;
    public string? Potmaat { get; set; }
    public string? Steellengte { get; set; }
    [Range(1, int.MaxValue)] public int Hoeveelheid { get; set; }
    [Range(0.01, double.MaxValue)] public decimal MinimumPrijs { get; set; }
    [Required] public KlokLocatie GewensteKloklocatie { get; set; }
    [Required] public DateOnly Veildatum { get; set; }
}