using System;
using Newtonsoft.Json;

namespace ShoppingWebSiteUI.Models
{
    public class AddToCartDTO
    {
        [JsonProperty(PropertyName = "productId")]
        public string ProductId;
        [JsonProperty(PropertyName = "quantity")]
        public string Quantity;

    }
}
