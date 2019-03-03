using System;
namespace ShoppingWebApi.Models
{
    public class CardDTO
    {
        public int Id { get; set; }

        public long CardNo { get; set; }

        public int CVV { get; set; }

        public byte[] CreatedAt { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
