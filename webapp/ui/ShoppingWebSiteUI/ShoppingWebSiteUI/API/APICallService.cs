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
            _client = new APICallClient("http://localhost:3000");
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

        /// <summary>
        /// Gets the cart itemss.
        /// </summary>
        /// <returns>The cart itemss.</returns>
        public async Task<IEnumerable<ProductDTO>> GetCartItems()
        {
            Console.WriteLine("Fetching all items from Cart");// Read product list:
            var products = await _client.GetProductsAsync();
            return products;

        }

        /// <summary>
        /// Dos the login.
        /// </summary>
        /// <returns>The login.</returns>
        /// <param name="username">Username.</param>
        /// <param name="password">Password.</param>
        public async Task<HttpStatusCode> DoLogin(User user)
        {
            return await _client.PerformLogin(user);
        }

    }
}
