using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs;

public class LoginRequestDTO
{
    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, MinLength(6)]
    public required string Password { get; set; }
}
