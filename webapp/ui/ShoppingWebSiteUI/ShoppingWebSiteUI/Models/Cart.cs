using System;
using System.Collections.Generic;

namespace ShoppingWebSiteUI.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public float Price { get; set; }

        public byte[] CreatedAt { get; set; }

        public int ProductID { get; set; }

        public string Username { get; set; }
    }
}


