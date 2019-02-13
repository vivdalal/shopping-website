using System;
using System.Collections.Generic;

namespace ShoppingWebSiteUI.Models
{
    public class CartDTO
    {
        public string UserName { get; set; }
        public IEnumerable<ProductDTO> Products { get; set; }
        public float TotalPrice { get; set; }
       
    }
}
