using API.Data;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        var orders = await context.Orders
            .Include(x => x.OrderItems)
            .Where(x => x.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return orders;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Order>> GetOrdersDetails(int id)
    {
        var order = await context.Orders
            .Where(x => x.BuyerEmail == User.GetUsername() && x.Id == id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }
}
