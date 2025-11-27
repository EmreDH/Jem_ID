using BackEnd.Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackEnd.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Aanvoerder> Aanvoerders => Set<Aanvoerder>();
        public DbSet<AanvoerderItem> AanvoerItems => Set<AanvoerderItem>();
        public DbSet<AuctionItem> AuctionItems => Set<AuctionItem>();

        protected override void OnModelCreating(ModelBuilder b)
        {
            base.OnModelCreating(b);

            var roleConverter = new EnumToStringConverter<Role>();

            // USER
            b.Entity<User>(e =>
            {
                e.ToTable("Users");
                e.HasKey(x => x.Id);
                e.Property(x => x.Name).HasMaxLength(100).IsRequired();
                e.Property(x => x.Email).HasMaxLength(255).IsRequired();
                e.HasIndex(x => x.Email).IsUnique();
                e.Property(x => x.PasswordHash).HasMaxLength(255).IsRequired();
                e.Property(x => x.Role).HasConversion(roleConverter).HasMaxLength(50).IsRequired();
            });

            // AANVOERDER
            b.Entity<Aanvoerder>(e =>
            {
                e.ToTable("Aanvoerders");
                e.HasKey(x => x.Id);

                e.HasMany(a => a.Items)
                    .WithOne(i => i.Aanvoerder)
                    .HasForeignKey(i => i.AanvoerderId)
                    .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(a => a.User)
                    .WithMany() // User can have multiple Aanvoerders if needed
                    .HasForeignKey(a => a.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

            });

            // AANVOERDER ITEM
            b.Entity<AanvoerderItem>(e =>
            {
                e.ToTable("AanvoerItems");
                e.HasKey(x => x.Id);

                e.Property(x => x.FotoUrl).HasMaxLength(500);
                e.Property(x => x.Naam_Product).HasMaxLength(200).IsRequired();
                e.Property(x => x.Soort).HasMaxLength(100);
                e.Property(x => x.Potmaat).HasMaxLength(50);
                e.Property(x => x.Steellengte).HasMaxLength(50);
                e.Property(x => x.Hoeveelheid).IsRequired();
                e.Property(x => x.MinimumPrijs).HasPrecision(10, 2);
                e.Property(x => x.Opbrengst).HasPrecision(10, 2);
                e.Property(x => x.GewensteKlokLocatie).HasConversion<string>().HasMaxLength(50);
                e.Property(x => x.Veildatum).IsRequired();
            });

            // AUCTION ITEM
            b.Entity<AuctionItem>(e =>
            {
                e.ToTable("AuctionItems");
                e.HasKey(x => x.Id);

                e.HasOne(a => a.AanvoerderItem)
                    .WithOne()
                    .HasForeignKey<AuctionItem>(x => x.AanvoerItemId)
                    .OnDelete(DeleteBehavior.Cascade);

                e.Property(x => x.CurrentPrice).HasPrecision(10, 2);
                e.Property(x => x.FinalPrice).HasPrecision(10, 2);

                e.HasIndex(x => x.AanvoerItemId).IsUnique();
                e.HasIndex(x => x.EndTimeUtc);
            });
        }
    }
}
