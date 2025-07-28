
namespace API.DTOs;

public class BasketDto
{
  public required string BasketId { get; set; } // store this in cookie

  public List<BasketItemDto> Items { get; set; } = [];

  public string? ClientSecret { get; set; }

  public string? PaymentIntentId { get; set; }
}
