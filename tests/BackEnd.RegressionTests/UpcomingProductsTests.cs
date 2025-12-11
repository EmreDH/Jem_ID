using System.Net.Http.Json;
using FluentAssertions;
using BackEnd.IntegrationTests;
using BackEnd.IntegrationTests.Helpers;

public class UpcomingProductsTests : IClassFixture<CustomWebFactory>
{
    private readonly HttpClient _client;

    public UpcomingProductsTests(CustomWebFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task UpcomingProducts_ShouldOnlyReturnFutureDates()
    {
        var response = await _client.GetAsync("/api/aanvoerderitem/upcoming-products");
        var products = await response.Content.ReadFromJsonAsync<List<AanvoerderItemListDTO>>();

        products.Should().OnlyContain(p => p.Veildatum > DateOnly.FromDateTime(DateTime.Now));
    }
}
