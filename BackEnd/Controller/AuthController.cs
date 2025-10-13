using BackEnd.Classes;
using BackEnd.Data;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
    {
        if (request is null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { message = "Email en wachtwoord zijn verplicht" });

        var email = request.Email.Trim().ToLowerInvariant();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null || !PasswordHasher.VerifyPassword(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Ongeldige email of wachtwoord" });

        var token = _jwtService.GenerateToken(user);
        return Ok(new { token });
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDTO request)
    {
        if (request is null ||
            string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Alle velden zijn verplicht" });
        }

        var email = request.Email.Trim().ToLowerInvariant();

        if (await _context.Users.AnyAsync(u => u.Email == email))
            return BadRequest(new { message = "Email bestaat al" });

        var user = new User
        {
            Name = request.Name.Trim(),
            Email = email,
            Role = Role.Klant,
            PasswordHash = PasswordHasher.HashPassword(request.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Registratie succesvol" });
    }

    // endpoint om profielgegevens op te halen
    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        // Email claim uit token
        var email =
            User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value
            ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        if (string.IsNullOrWhiteSpace(email))
            return Unauthorized(new { message = "Geen geldige token gevonden" });

        email = email.Trim().ToLowerInvariant();

        var user = await _context.Users
            .AsNoTracking()
            .Where(u => u.Email == email)
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.Email,
                Role = u.Role.ToString()
            })
            .FirstOrDefaultAsync();

        if (user is null)
            return NotFound(new { message = "Gebruiker niet gevonden" });

        return Ok(user);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("promote-admin")]
    public async Task<IActionResult> PromoteAdmin([FromBody] UpdateProfileDTO dto)
    {
        if (dto is null || string.IsNullOrWhiteSpace(dto.Email))
            return BadRequest(new { message = "Email is verplicht." });

        var email = dto.Email.Trim().ToLowerInvariant();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null)
            return NotFound(new { message = "Gebruiker niet gevonden." });

        if (user.Role == Role.Admin)
            return Conflict(new { message = "Gebruiker is al Admin." });

        user.Role = Role.Admin;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Gebruiker gepromoveerd tot Admin.", userId = user.Id, user.Email });
    }
}