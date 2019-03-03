using Microsoft.EntityFrameworkCore;
using ShoppingWebApi.Models;

namespace ShoppingWebApi.Models
{
    public class ShoppingWebApiContext : DbContext
    {
        public ShoppingWebApiContext (DbContextOptions<ShoppingWebApiContext> options)
            : base(options)
        {
        }

        public DbSet<ShoppingWebApi.Models.User> User { get; set; }

        public DbSet<ShoppingWebApi.Models.Product> Product { get; set; }

        public DbSet<ShoppingWebApi.Models.Cart> Cart { get; set; }

        public DbSet<ShoppingWebApi.Models.Order> Order { get; set; }

        public DbSet<ShoppingWebApi.Models.Card> Card { get; set; }
    }
}
