namespace API.RequestHelpers;

public class PaginationParams
{
  private const int MaxPageSize = 50;

  public int PageNumber { get; set; } = 1;

  private int _pageSize = 8;

  public int PageSize
  {
    // (getter)
    get { return _pageSize; } // get => _pageSize;

    // (setter)
    set { _pageSize = value > MaxPageSize ? MaxPageSize : value; } // set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
  }
}