using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Voor minimal APIs niet verplicht, maar kan:
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.SwaggerDoc("v1", new OpenApiInfo { Title = "backendAPI", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();      // publiceert /swagger/v1/swagger.json
    app.UseSwaggerUI();    // UI op /swagger
}

app.UseHttpsRedirection();

app.MapGet("/weatherforecast", () => new[] { "ok" })
   .WithName("GetWeatherForecast")
   .WithOpenApi(); // nodig voor minimal APIs

app.Run();
