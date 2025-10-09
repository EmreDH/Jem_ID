using Microsoft.EntityFrameworkCore;
using BackEnd.Classes;

namespace BackEnd.Database;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
}
