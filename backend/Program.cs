using BackEnd.Classes;
using BackEnd.Data;
 // ✅ Nodig om toegang te hebben tot Aanvoerder en AanvoerderItem modellen
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ✅ Controllers met enum-conversie (voor b.v. KlokLocatie)
builder.Services
    .AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// ✅ JWT authenticatie (blijft exact zoals je had)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            ),
            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.Email,
            ClockSkew = TimeSpan.Zero
        };
    });

// ✅ Authorization policies (nog nodig voor [Authorize])
builder.Services.AddAuthorization();

// ✅ Swagger configuratie met JWT ondersteuning
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "backendAPI", Version = "v1" });

    var jwt = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
    };
    c.AddSecurityDefinition("Bearer", jwt);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement { { jwt, Array.Empty<string>() } });
});

// ✅ JWT Service behouden
builder.Services.AddSingleton<JwtService>();

// ✅ SQL Server configuratie behouden (ApplicationDbContext toevoegen)
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Voeg hier niets weg — enkel toevoegen wat al bestaat in je DbContext:
// In ApplicationDbContext.cs moet staan:
// public DbSet<Aanvoerder> Aanvoerders { get; set; }
// public DbSet<AanvoerderItem> AanvoerderItems { get; set; }

// ✅ CORS instellingen behouden
builder.Services.AddCors(o =>
{
    o.AddPolicy("frontend", p =>
        p.WithOrigins(
             "http://localhost:3000",
             "https://localhost:3000",
             "http://localhost:5173"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

var app = builder.Build();

// ✅ Swagger blijft alleen actief in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Middleware volgorde is belangrijk
app.UseHttpsRedirection();
app.UseCors("frontend");
app.UseAuthentication();
app.UseAuthorization();

// ✅ Controllers worden automatisch gemapt (zoals AanvoerderItemController)
app.MapControllers();

app.Run();
