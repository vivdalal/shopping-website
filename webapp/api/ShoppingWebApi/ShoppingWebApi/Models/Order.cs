using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingWebApi.Models
{
    [Table("Orders")]
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public float Price { get; set; }

        [Timestamp]
        [Column("created_at")]
        public byte[] CreatedAt { get; set; }

        // Foreign keys
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("product_id")]
        public int ProductId { get; set; }

        // Navigation
        public User User { get; set; }

        public Product Product { get; set; }
    }
}
