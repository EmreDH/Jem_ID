using System.Net.Http.Json;
using FluentAssertions;
using BackEnd.IntegrationTests;
using BackEnd.IntegrationTests.Helpers;



public class AuthControllerTests : IClassFixture<CustomWebFactory>
{
    private readonly HttpClient _client;

    public AuthControllerTests(CustomWebFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Register_ShouldCreateNewUser()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/register", new 
        {
            Name = "Test",
            Email = "test@test.com",
            Password = "password1"
        });

        response.IsSuccessStatusCode.Should().BeTrue();
    }

    [Fact]
    public async Task Login_ShouldReturnToken()
    {
        await _client.PostAsJsonAsync("/api/auth/register", new 
        {
            Name = "Test",
            Email = "test2@test.com",
            Password = "password1"
        });

        var response = await _client.PostAsJsonAsync("/api/auth/login", new 
        {
            Email = "test2@test.com",
            Password = "password1"
        });

        var json = await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();

        json["token"].Should().NotBeNullOrEmpty();
    }
}
