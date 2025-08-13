using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class OrderItemDto
{
    public int ProductId { get; set; }

    public required string Name { get; set; }

    public required string PictureUrl { get; set; }

    public long Price { get; set; }

    public int Quantity { get; set; }
}
