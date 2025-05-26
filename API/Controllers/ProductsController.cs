using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using API.Entities;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")] // https://localhost:5001/api/products
[ApiController]
public class ProductsController(StoreContext _context) : ControllerBase
{

  // vvvvvvvv Conventional Contructor vvvvvvvv

  // private readonly StoreContext _context;
  // public ProductsController(StoreContext context)
  // {
  //   this._context = context;
  // }

  [HttpGet]
  public async Task<ActionResult<List<Product>>> GetProducts()
  {
    return await _context.Products.ToListAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Product>> GetProduct(int id)
  {
    var product = await _context.Products.FindAsync(id);

    if (product == null) return NotFound();

    return product;
  }
  
  
}