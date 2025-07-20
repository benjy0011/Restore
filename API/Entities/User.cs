using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class User : IdentityUser
{
  public int? AddressId { get; set; }
  public Address? Address { get; set; } // assume one user having one address only
}
