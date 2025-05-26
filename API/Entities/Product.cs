namespace API.Entities; // Location, matches the actual file path name

public class Product
{
  public int Id { get; set;} // convention of Entity Framework, auto use Id and Primary Key

  public required string Name { get; set; }

  // public string Name { get; set; } = ""; // Initialization

  public required string Description { get; set; }

  public long Price { get; set; }

  public required string PictureUrl { get; set; }

  public required string Brand { get; set; }

  public required string Type { get; set; }

  public int QuantityInStock { get; set; }
}