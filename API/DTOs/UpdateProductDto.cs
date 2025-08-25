using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateProductDto
{
    public int Id { get; set; }

    [Required] // give better output when data validation
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    [Range(100, double.PositiveInfinity)] // 100 is 1.00 in this context
    public long Price { get; set; }

    public IFormFile? File { get; set; }

    [Required]
    public string Brand { get; set; } = string.Empty;

    [Required]
    public string Type { get; set; } = string.Empty;

    [Required]
    [Range(0, 999)]
    public int QuantityInStock { get; set; }
}