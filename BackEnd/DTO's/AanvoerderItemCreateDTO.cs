using System.ComponentModel.DataAnnotations;
using BackEnd.Classes;

namespace BackEnd.DTOs
{
    public class AanvoerderItemCreateDTO
    {
        // Used when admin creates an item for a specific Aanvoerder
        // Aanvoerder users ignore this field
        public int? AanvoerderId { get; set; }

        public string? FotoUrl { get; set; }

        [Required]
        public string Naam_Product { get; set; } = string.Empty;

        [Required]
        public string Soort { get; set; } = string.Empty;

        public string? Potmaat { get; set; } = string.Empty;

        public string? Steellengte { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int Hoeveelheid { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal MinimumPrijs { get; set; }

        [Required]
        public KlokLocatie GewensteKlokLocatie { get; set; }

        [Required]
        public DateOnly Veildatum { get; set; }
    }
}
