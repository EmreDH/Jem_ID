using BackEnd.Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackEnd.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();

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

                // enum opslaan als string in kolom 'Role'
                e.Property(x => x.Role)
                 .HasConversion(roleConverter)
                 .HasMaxLength(50)
                 .IsRequired();
            });
        }
    }
}
