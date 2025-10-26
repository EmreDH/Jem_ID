using BackEnd.Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackEnd.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Aanvoerder> Aanvoerders => Set<Aanvoerder>();
        public DbSet<AanvoerItem> AanvoerItems => Set<AanvoerItem>();
        
        protected override void OnModelCreating(ModelBuilder b)
        {

            var roleConverter = new EnumToStringConverter<Role>();

            b.Entity<User>(e =>
            {
                e.ToTable("Users");
                e.HasKey(x => x.Id);
                e.Property(x => x.Name).HasMaxLength(100).IsRequired();
                e.Property(x => x.Email).HasMaxLength(255).IsRequired();
                e.HasIndex(x => x.Email).IsUnique();
                e.Property(x => x.PasswordHash).HasMaxLength(255).IsRequired();

                e.Property(x => x.Role)
                 .HasConversion(roleConverter)
                 .HasMaxLength(50)
                 .IsRequired();
            });

            b.Entity<Aanvoerder>(e =>
           {
               e.ToTable("Aanvoerders");
               e.HasKey(x => x.Id);

               e.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
           });

           b.Entity<AanvoerItem>(e =>
            {
                e.ToTable("AanvoerItems");
                e.HasKey(x => x.Id);

                e.HasOne(x => x.Aanvoerder)
                .WithMany(a => a.AanvoerItems)
                .HasForeignKey(x => x.AanvoerderId)
                .OnDelete(DeleteBehavior.Cascade);

                e.Property(x => x.Veildatum).HasColumnType("date").IsRequired();
                e.Property(x => x.Hoeveelheid).IsRequired();
                e.Property(x => x.FotoUrl).HasMaxLength(255).IsRequired();
                e.Property(x => x.Soort).HasMaxLength(100).IsRequired();
                e.Property(x => x.MinimumPrijs).HasPrecision(10, 2);
                e.Property(x => x.Opbrengst).HasPrecision(10, 2);
                e.Property(x => x.Potmaat).HasMaxLength(50);
                e.Property(x => x.Steellengte).HasMaxLength(50);

                e.Property(x => x.GewensteKloklocatie)
                .HasConversion<string>()
                .HasMaxLength(20)
                .IsRequired();

            });
        }
    }
}
