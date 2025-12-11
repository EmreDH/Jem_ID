using BackEnd.Classes;
using Microsoft.Extensions.Configuration;
using FluentAssertions;

public class JwtServiceTests
{
    private JwtService CreateService()
    {
        var settings = new Dictionary<string, string>
        {
            { "Jwt:Key", "supersecret123supersecret123456789012345" },
            { "Jwt:Issuer", "testissuer" },
            { "Jwt:Audience", "testaud" },
            { "Jwt:ExpirationInMinutes", "30" }
        };
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(settings)
            .Build();

        return new JwtService(config);
    }

    [Fact]
    public void GenerateToken_ShouldCreateValidJwt()
    {
        var service = CreateService();
        var user = new User
        {
            Id = 1,
            Email = "test@test.com",
            Name = "Test",
            PasswordHash = "x",
            Role = Role.Admin
        };

        var token = service.GenerateToken(user);

        token.Should().NotBeNullOrEmpty();
        token.Split('.').Length.Should().Be(3);
    }
}
