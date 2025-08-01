using API.Data;
using API.Middleware;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using API.Services;

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


// Payment
builder.Services.AddScoped<PaymentService>();


// User Identity
builder.Services
  .AddIdentityApiEndpoints<User>(opt =>
  {
    opt.User.RequireUniqueEmail = true;
  })
  .AddRoles<IdentityRole>()
  .AddEntityFrameworkStores<StoreContext>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi(); // not cover in this course

var app = builder.Build();



// Middleware
// Configure the HTTP request pipeline (sequence of this block of code is important)
app.UseMiddleware<ExceptionMiddleware>(); // sequence is important, put at top most
app.UseCors(opt =>
{
  opt
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials() // set up cookies
    .WithOrigins("https://localhost:3000"); // Permit localhost
});


// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi(); // this course is not using OpenApi
// }

// app.UseHttpsRedirection(); // not using 

// Auth middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>(); // api/login, configuring this will allow us to have access to builtin auth api

DbInitializer.InitDb(app);

app.Run();
