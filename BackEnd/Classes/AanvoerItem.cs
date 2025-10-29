using System.ComponentModel.DataAnnotations;

namespace BackEnd.Classes
{
    public enum KlokLocatie
    {
        Naaldwijk,
        Aalsmeer,
        Rijnsburg,
        Eelde
    }

    public class AanvoerItem
    {
        public int Id { get; set; }
        public string Naam_Product{ get; set; }

        public int AanvoerderId { get; set; }
        public Aanvoerder Aanvoerder { get; set; } = null!;

        [Required]
        public string FotoUrl { get; set; } = string.Empty;

        [Required]
        public string Soort { get; set; } = string.Empty;

        public string? Potmaat { get; set; }
        public string? Steellengte { get; set; }

        [Range(1, int.MaxValue)]
        public int Hoeveelheid { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal MinimumPrijs { get; set; }

        [Required]
        public KlokLocatie GewensteKloklocatie { get; set; }

        [Required]
        public DateOnly Veildatum { get; set; }

        public decimal? Opbrengst { get; set; }
        public int? KoperId { get; set; }
    }
}
