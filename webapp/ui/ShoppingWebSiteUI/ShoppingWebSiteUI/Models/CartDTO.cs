using System;
using System.Collections.Generic;

namespace ShoppingWebSiteUI.Models
{
    public class CartDTO
    {

        public int Id { get; set; }

        public int Quantity { get; set; }

        public float Price { get; set; }

        public byte[] CreatedAt { get; set; }

        public IEnumerable<ProductDTO> Products { get; set; }

    }
}


