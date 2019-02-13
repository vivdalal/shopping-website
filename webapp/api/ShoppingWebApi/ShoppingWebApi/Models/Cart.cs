using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingWebApi.Models
{
    [Table("Carts")]
    public class Cart
    {
        public int Id { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public float Price { get; set; }

        [Timestamp]
        public byte[] CreatedAt { get; set; }

        // Foreign keys
        public int UserId { get; set; }

        public int ProductId { get; set; }

        // Navigation
        public User User { get; set; }

        public Product Product { get; set; }
    }
}
