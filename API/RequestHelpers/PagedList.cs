using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PagedList<T> : List<T> // T = Product
{
  public PagedList(List<T> items, int count, int pageNumber, int pageSize)
  {
    Metadata = new PaginationMetadata
    {
      TotalCount = count,
      PageSize = pageSize,
      CurrentPage = pageNumber,
      TotalPages = (int)Math.Ceiling(count / (double)pageSize)
    };
    AddRange(items);
  }

  public PaginationMetadata Metadata { get; set; }

  public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
  {
    var count = await query.CountAsync();
    var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(); // .Skip .Take is equivalent to JS .slice

    return new PagedList<T>(items, count, pageNumber, pageSize);
  }
}