using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using BackEnd.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace BackEnd.IntegrationTests.Helpers
{
    public static class Auth
    {
        public static async Task<(string token, int aanvoerderId)> GetTokenAndAanvoerderId(HttpClient client, ApplicationDbContext db)
        {
            var uniqueEmail = $"integration_{Guid.NewGuid()}@test.com";

            // Register test user
            var registerResponse = await client.PostAsJsonAsync("/api/auth/register", new
            {
                Name = "IntegrationUser",
                Email = uniqueEmail,
                Password = "Password123!"
            });

            if (!registerResponse.IsSuccessStatusCode)
            {
                var text = await registerResponse.Content.ReadAsStringAsync();
                throw new Exception("Registration failed: " + text);
            }

            // Login
            var loginResponse = await client.PostAsJsonAsync("/api/auth/login", new
            {
                Email = uniqueEmail,
                Password = "Password123!"
            });

            if (!loginResponse.IsSuccessStatusCode)
            {
                var text = await loginResponse.Content.ReadAsStringAsync();
                throw new Exception("Login failed: " + text);
            }

            var json = await loginResponse.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(json);
            var token = doc.RootElement.GetProperty("token").GetString()
                        ?? throw new Exception("Login returned no token.");

            // Voeg Aanvoerder toe
            var user = await db.Users.FirstAsync(u => u.Email == uniqueEmail);
            var aanvoerder = new Classes.Aanvoerder { UserId = user.Id };
            db.Aanvoerders.Add(aanvoerder);
            await db.SaveChangesAsync();

            return (token, aanvoerder.Id);
        }
    }
}
