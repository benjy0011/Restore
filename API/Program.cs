using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi(); // not cover in this course

var app = builder.Build();

// Middleware
// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi(); // this course is not using OpenApi
// }

// app.UseHttpsRedirection(); // not using 

// app.UseAuthorization(); // not using

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
