using API.Data;
using API.DTOs;
using API.Entities;
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

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId)) return BadRequest("Basket is empty or not found");

        var items = CreateOrderItems(basket.Items);
        if (items == null) return BadRequest("Some items are out of stock.");

        var subtotal = items.Sum(x => x.Price * x.Quantity);

        var deliveryFee = CalculateDeliveryFee(subtotal);

        var order = new Order
        {
            OrderItems = items,
            BuyerEmail = User.GetUsername(),
            ShippingAddress = orderDto.ShippingAddress,
            DeliveryFee = deliveryFee,
            Subtotal = subtotal,
            PaymentSummary = orderDto.PaymentSummary,
            PaymentIntentId = basket.PaymentIntentId
        };

        context.Orders.Add(order);

        context.Baskets.Remove(basket);
        Response.Cookies.Delete("basketId");

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Problem creating order");

        return CreatedAtAction(nameof(GetOrdersDetails), new { id = order.Id }, order);
    }

    private static long CalculateDeliveryFee(long subtotal)
    {
        return subtotal > 10000 ? 0 : 500;
    }

    private static List<OrderItem>? CreateOrderItems(List<BasketItem> items)
    {
        var orderItems = new List<OrderItem>();


        foreach (var item in items)
        {
            if (item.Product.QuantityInStock < item.Quantity) return null;

            var orderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl,
                },
                Price = item.Product.Price,
                Quantity = item.Quantity,
            };

            orderItems.Add(orderItem);

            item.Product.QuantityInStock -= item.Quantity;
        }

        return orderItems;
        
    }
}
