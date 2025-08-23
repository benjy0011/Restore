using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using API.Entities;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using API.DTOs;
using AutoMapper;

namespace API.Controllers;

// [Route("api/[controller]")] // https://localhost:5001/api/products
// [ApiController]

// public class ProductsController(StoreContext _context) : ControllerBase

public class ProductsController(StoreContext _context, IMapper _mapper) : BaseApiController
{

  // vvvvvvvv Conventional Contructor vvvvvvvv

  // private readonly StoreContext _context;
  // public ProductsController(StoreContext context)
  // {
  //   this._context = context;
  // }

  [HttpGet]
  public async Task<ActionResult<List<Product>>> GetProducts(
    // string? orderBy, string? searchTerm, string? brands, string? types // orderBy is urlParam, exp: ?orderBy=price
    [FromQuery] ProductParams productParams
    )
  {
    // the 'query' do nothing until we call it with '.toList' because of ".AsQueryable();"
    var query = _context.Products
      .Sort(productParams.OrderBy)
      .Search(productParams.SearchTerm)
      .Filter(productParams.Brands, productParams.Types)
      .AsQueryable();

    var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

    Response.AddPaginationHeader(products.Metadata);

    // return await _context.Products.ToListAsync();
    // return await query.ToListAsync();

    // return Ok(new { Items = products, products.Metadata });
    return products;
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Product>> GetProduct(int id)
  {
    var product = await _context.Products.FindAsync(id);

    if (product == null) return NotFound();

    return product;
  }

  [HttpGet("filters")]
  public async Task<IActionResult> GetFilters()
  {
    var brands = await _context.Products.Select(x => x.Brand).Distinct().ToListAsync();
    var types = await _context.Products.Select(x => x.Type).Distinct().ToListAsync();

    return Ok(new { brands, types });
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
  {
    var product = _mapper.Map<Product>(productDto);

    _context.Products.Add(product);

    var result = await _context.SaveChangesAsync() > 0;

    if (result) return CreatedAtAction(
      nameof(GetProduct),
      new { Id = product.Id },
      product
    );

    return BadRequest("Problem creating new product.");
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<ActionResult> UpdateProduct(UpdateProductDto updateProductDto)
  {
    var product = await _context.Products.FindAsync(updateProductDto.Id);

    if (product == null) return NotFound();

    _mapper.Map(updateProductDto, product);

    var result = await _context.SaveChangesAsync() > 0;

    if (result) return NoContent();

    return BadRequest("Problem updating the product.");
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteProduct(int id)
  {
    var product = await _context.Products.FindAsync(id);

    if (product == null) return NotFound();

    _context.Products.Remove(product);

    var result = await _context.SaveChangesAsync() > 0;

    if (result) return Ok();

    return BadRequest("Problem deleting the product.");
  }
}