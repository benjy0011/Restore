using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. (sequence doesnt matter for builder)

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add cors
builder.Services.AddCors();

// Scoped is the most common (hierachy architecture) - ready anytime, get new per visit, reuse per request [one instance per HTTP request, reused within that request only]
// Transient - when not needed everytime, new per request [a new instance every time it's needed, even within the same request]
// Singleton - reuse everytime when app starts [reused everywhere when app starts]
builder.Services.AddTransient<ExceptionMiddleware>();


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi(); // not cover in this course

var app = builder.Build();



// Middleware
// Configure the HTTP request pipeline (sequence of this block of code is important)
app.UseMiddleware<ExceptionMiddleware>(); // sequence is important, put at top most
app.UseCors(opt =>
{
  opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000"); // Permit localhost
});


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
