namespace BackEnd.Classes;

public class Aanvoerder
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public ICollection<AanvoerderItem> AanvoerderItems { get; set; } = new List<AanvoerderItem>();
}
