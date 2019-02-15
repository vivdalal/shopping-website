namespace ShoppingWebApi.Models
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsInStock { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }
    }
}
