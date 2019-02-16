using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingWebApi.Models
{
    [Table("Products")]
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public double Price { get; set; }

        public int Quantity { get; set; }

        public string Category { get; set; }

        public string ImageUrl { get; set; }
    }
}
