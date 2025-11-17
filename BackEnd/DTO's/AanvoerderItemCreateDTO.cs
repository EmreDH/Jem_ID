using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class AanvoerderItemCreateDTO
    {
        public string? FotoUrl { get; set; }

        [Required]
        public string Naam_Product { get; set; } = string.Empty;

        [Required]
        public string Soort { get; set; } = string.Empty;

        [Required]
        public string Potmaat { get; set; } = string.Empty;

        [Required]
        public string Steellengte { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int Hoeveelheid { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal MinimumPrijs { get; set; }

        [Required]
        [StringLength(100)]
        public KlokLocatie GewensteKlokLocatie { get; set; }

        [Required]
        public DateOnly Veildatum { get; set; }
    }
}
