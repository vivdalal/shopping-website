using System;
using Newtonsoft.Json;

namespace ShoppingWebSiteUI.Models
{
    public class CartItem
    {
        [JsonProperty(PropertyName = "productId")]
        public int ProductId;
        [JsonProperty(PropertyName = "quantity")]
        public int Quantity;

        public string Username;
    }
}
