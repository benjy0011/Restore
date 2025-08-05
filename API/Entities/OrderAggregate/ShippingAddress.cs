using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;


namespace API.Entities.OrderAggregate;

[Owned] // Not standalone, is owned by a parent, doesnt have id
public class ShippingAddress
{
    public required string Name { get; set; }
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }

    [JsonPropertyName("postal_code")] // look into json property that has this name `postal_code` instead of `PostalCode`
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
}
