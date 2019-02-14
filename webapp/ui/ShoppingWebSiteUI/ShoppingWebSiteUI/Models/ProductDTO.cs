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


        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public bool IsInStock { get; set; }
    }
}
