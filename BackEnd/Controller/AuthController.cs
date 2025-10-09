using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;   
using BackEnd.DTOs;
using BackEnd.Classes;

namespace BackEnd.Controller;

[ApiController]                              
[AllowAnonymous]                             
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;
    public AuthController(JwtService jwtService) => _jwtService = jwtService;

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDTO request)
    {
        var user = new User
        {
            Id = 1,
            Name = "Em",
            Email = request.Email,
            Role = Role.Admin,
            PasswordHash = PasswordHasher.HashPassword("test123")
        };

        if (!PasswordHasher.VerifyPassword(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Ongeldige login" });

        var token = _jwtService.GenerateToken(user);
        return Ok(new { Token = token });
    }
}
