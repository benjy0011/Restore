using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using API.Entities;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Extensions;

namespace API.Controllers;

// [Route("api/[controller]")] // https://localhost:5001/api/products
// [ApiController]

// public class ProductsController(StoreContext _context) : ControllerBase

public class ProductsController(StoreContext _context) : BaseApiController
{

  // vvvvvvvv Conventional Contructor vvvvvvvv

  // private readonly StoreContext _context;
  // public ProductsController(StoreContext context)
  // {
  //   this._context = context;
  // }

  [HttpGet]
  public async Task<ActionResult<List<Product>>> GetProducts(string orderBy) // orderBy is urlParam, exp: orderBy=price
  {
    // the 'query' do nothing until we call it with '.toList'
    var query = _context.Products
      .Sort(orderBy)
      .AsQueryable();

    // return await _context.Products.ToListAsync();
    return await query.ToListAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Product>> GetProduct(int id)
  {
    var product = await _context.Products.FindAsync(id);

    if (product == null) return NotFound();

    return product;
  }


}