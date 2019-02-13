using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using ShoppingWebSiteUI.Models;

namespace ShoppingWebSiteUI.API
{
    public class APICallService
    {
        private APICallClient _client;

        public APICallService()
        {
            _client = new APICallClient("https://weapidemo.azurewebsites.net");
        }
        /// <summary>
        /// Gets all products.
        /// </summary>
        /// <returns>The all products.</returns>
        public async Task<IEnumerable<ProductDTO>> GetAllProducts()
        {
            Console.WriteLine("Fetching all products");// Read product list:
            var products = await _client.GetProductsAsync();
            return products;
 
        }

        public async Task<IEnumerable<ProductDTO>> GetCartItemss()
        {
            Console.WriteLine("Fetching all items from Cart");// Read product list:
            var products = await _client.GetProductsAsync();
            return products;

        }

        public async Task<HttpStatusCode> DoLogin(string username, string password)
        {
            return await _client.PerformLogin(username, password);
        }

    }
}
