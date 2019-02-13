using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingWebApi.Models
{
    public class OrderDTO
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public float Price { get; set; }

        public byte[] CreatedAt { get; set; }

        public string ProductName { get; set; }

        public string ProductDescription { get; set; }
    }
}
