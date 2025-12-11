using BackEnd.Data;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.UnitTests.TestHelpers
{
    public static class InMemoryDbContextFactory
    {
        public static ApplicationDbContext CreateContext(string dbName = "TestDb")
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            return new ApplicationDbContext(options);
        }
    }
}
