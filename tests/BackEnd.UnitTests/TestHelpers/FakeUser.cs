using System.Security.Claims;

namespace BackEnd.UnitTests.TestHelpers
{
    public static class FakeUser
    {
        public static ClaimsPrincipal WithUserId(int id)
        {
            var identity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, id.ToString())
            }, "TestAuth");

            return new ClaimsPrincipal(identity);
        }
    }
}
