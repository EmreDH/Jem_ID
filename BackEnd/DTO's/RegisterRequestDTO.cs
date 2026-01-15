using System.ComponentModel.DataAnnotations;
using BackEnd.Classes; // 👈 Add this so we can use the Role enum

public class RegisterRequestDTO
{
    [Required(ErrorMessage = "Naam is verplicht")]
    public string Name { get; set; }

    [Required(ErrorMessage = "E-mail is verplicht")]
    [EmailAddress(ErrorMessage = "Ongeldig e-mailadres")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Wachtwoord is verplicht")]
    [MinLength(8, ErrorMessage = "Wachtwoord moet minimaal 8 tekens bevatten")]
    public string Password { get; set; }

}
