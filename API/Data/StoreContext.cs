using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// public class StoreContext : DbContext
// {
//   public StoreContext(DbContextOptions options)
//   {

//   }
// }

// ^^^^^ Similar to convention constructor above ^^^^^^

public class StoreContext(DbContextOptions options) : DbContext(options)
{
  public required DbSet<Product> Products { get; set; }

  public required DbSet<Basket> Baskets { get; set; } // the children table [BasketItem] will be automatially created


  
}