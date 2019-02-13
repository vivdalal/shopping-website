using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ShoppingWebSiteUI.Models;

namespace ShoppingWebSiteUI.API
{
    public class APICallService
    {
        public APICallService()
        {
        }
        /// <summary>
        /// Gets all products.
        /// </summary>
        /// <returns>The all products.</returns>
        public async Task<IEnumerable<ProductDTO>> GetAllProducts()
        {
            var client = new APICallClient("https://weapidemo.azurewebsites.net"); //Add the Azure endpoint here
            Console.WriteLine("Fetching all products");// Read product list:
            var products = await client.GetProductsAsync();
            return products;
 
        }

        public async Task<IEnumerable<ProductDTO>> GetCartItemss()
        {
            var client = new APICallClient("https://weapidemo.azurewebsites.net"); //Add the Azure endpoint here
            Console.WriteLine("Fetching all items from Cart");// Read product list:
            var products = await client.GetProductsAsync();
            return products;

        }

    }
}
