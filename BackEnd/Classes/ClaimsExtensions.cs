using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BackEnd.Classes
{
    public static class ClaimsExtensions
    {
        public static int? GetUserId(this ClaimsPrincipal user)
        {
            var v = user.FindFirstValue(JwtRegisteredClaimNames.Sub)
                    ?? user.FindFirstValue(ClaimTypes.NameIdentifier);

            return int.TryParse(v, out var id) ? id : (int?)null;
        }
    }
}
