namespace ShoppingWebApi.Models
{
    public class CartItemDTO
    {
        public int Quantity { get; set; }

        public int ProductID { get; set; }

        public string Username { get; set; }
    }
}
