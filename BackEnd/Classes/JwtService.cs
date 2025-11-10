using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace BackEnd.Classes
{
    public class JwtService
    {
        private readonly IConfiguration _config;
        private readonly string _secret;
        private readonly string _issuer;
        private readonly string _audience;

        public JwtService(IConfiguration config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));

            _secret = _config["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key not found");
            _issuer = _config["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer not found");
            _audience = _config["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience not found");
        }

        public string GenerateToken(User user, int? minutesOverride = null)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            string roleNormalized = user.Role.ToString().ToLowerInvariant();

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),

                new Claim(ClaimTypes.Role, roleNormalized),

                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            int minutes = minutesOverride
                ?? (int.TryParse(_config["Jwt:ExpirationInMinutes"], out var m) ? m : 120);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(minutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
