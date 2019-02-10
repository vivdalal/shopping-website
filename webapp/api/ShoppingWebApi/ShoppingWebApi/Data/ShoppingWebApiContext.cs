using Microsoft.EntityFrameworkCore;

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
    }
}
