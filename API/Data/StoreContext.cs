using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// public class StoreContext : DbContext
// {
//   public StoreContext(DbContextOptions options)
//   {

//   }
// }

// ^^^^^ Similar to convention constructor above ^^^^^^

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
  public required DbSet<Product> Products { get; set; }

  public required DbSet<Basket> Baskets { get; set; } // the children table [BasketItem] will be automatially created

  public required DbSet<Order> Orders { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<IdentityRole>()
      .HasData(
        new IdentityRole { Id = "66cd9be6-ad6d-4716-a54f-0f99ee6379c4", Name = "Member", NormalizedName = "MEMBER" },
        new IdentityRole { Id = "673708c2-1c1f-4d07-a890-76f8bf448cc9", Name = "Admin", NormalizedName = "ADMIN" }
      );
  }
  
}