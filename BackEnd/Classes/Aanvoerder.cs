namespace BackEnd.Classes
{
    public class Aanvoerder
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        // ✅ Renamed to "Items" to match ApplicationDbContext
        public ICollection<AanvoerderItem> Items { get; set; } = new List<AanvoerderItem>();
    }
}
