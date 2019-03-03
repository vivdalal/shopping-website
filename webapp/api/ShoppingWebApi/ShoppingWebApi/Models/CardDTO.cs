using System;
namespace ShoppingWebApi.Models
{
    public class CardDTO
    {
        public int Id { get; set; }

        public long CardNo { get; set; }

        public int CVV { get; set; }

        public String Expiry { get; set; }

        public String CardName { get; set; }

        public string Username { get; set; }

    }
}
