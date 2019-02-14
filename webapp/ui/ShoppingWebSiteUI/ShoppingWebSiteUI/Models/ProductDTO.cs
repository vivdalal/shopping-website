namespace ShoppingWebSiteUI.Models
{
    public class ProductDTO
    {

        public ProductDTO(string name, string description, float price, bool isInStock)
        {
            Name = name;
            Description = description;
            Price = price;
            IsInStock = isInStock;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public bool IsInStock { get; set; }
        public string Category { get; set; }
    }
}
