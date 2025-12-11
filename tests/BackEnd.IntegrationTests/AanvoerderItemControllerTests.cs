using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using FluentAssertions;
using BackEnd.IntegrationTests.Helpers;
using Microsoft.Extensions.DependencyInjection;

using BackEnd.Data;
using Xunit;

public class AanvoerderItemControllerTests : IClassFixture<CustomWebFactory>
{
    private readonly CustomWebFactory _factory;
    private readonly HttpClient _client;

    public AanvoerderItemControllerTests(CustomWebFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task CreateAanvoerderItem_ShouldStoreItem()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        (string token, int aanvoerderId) = await Auth.GetTokenAndAanvoerderId(_client, db);

        var form = new MultipartFormDataContent();
        form.Add(new StringContent("Roos"), "Naam_Product");
        form.Add(new StringContent("Bloem"), "Soort");
        form.Add(new StringContent("1"), "Hoeveelheid");
        form.Add(new StringContent("10.50"), "MinimumPrijs");
        form.Add(new StringContent("Naaldwijk"), "GewensteKlokLocatie");
        form.Add(new StringContent(DateTime.Now.AddDays(2).ToString("yyyy-MM-dd")), "Veildatum");

        // Voeg een dummy foto toe
        var dummyImage = new ByteArrayContent(new byte[] { 1, 2, 3 });
        dummyImage.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
        form.Add(dummyImage, "foto", "dummy.jpg");

        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        var response = await _client.PostAsync("/api/aanvoerderitem", form);

        response.IsSuccessStatusCode.Should().BeTrue();

        var resultJson = await response.Content.ReadAsStringAsync();
        resultJson.Should().Contain("Product opgeslagen");
    }

}
