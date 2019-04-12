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
            _client = new APICallClient("http://localhost:5000");
        }
        /// <summary>
        /// Gets all products.
        /// </summary>
        /// <returns>The all products.</returns>
        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            Console.WriteLine("Fetching all products");// Read product list:
            var products = await _client.GetProductsAsync();
            return products;
 
        }

        /// <summary>
        /// Gets the cart itemss.
        /// </summary>
        /// <returns>The cart itemss.</returns>
        public async Task<IEnumerable<Cart>> GetCartItems(string username)
        {
            Console.WriteLine("Fetching all items from Cart");// Read product list:
            var cartItems = await _client.GetCartItemsAsync(username);
            return cartItems;

        }

        /// <summary>
        /// Gets all the cards for this user
        /// </summary>
        /// <param name="username"></param>
        /// <returns>The list of all cards</returns>
        public async Task<IEnumerable<Card>> GetCards(string username)
        {
            var cards = await _client.GetCardsAsync(username);
            return cards;

        }

        /// <summary>
        /// Adds the card for the user
        /// </summary>
        /// <param name="card"></param>
        /// <returns></returns>
        public async Task<HttpStatusCode> AddToCards(Card card)
        {
            return await _client.AddCardForTheUser(card);
        }

        /// <summary>
        /// Adds to cart.
        /// </summary>
        /// <returns>The to cart.</returns>
        /// <param name="cart">Cart.</param>
        public async Task<HttpStatusCode> AddToCart(CartItem cartItem)
        {
            try
            {
                return await _client.AddProductToCart(cartItem);
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        /// <summary>
        /// Does the login.
        /// </summary>
        /// <returns>The login.</returns>
        /// <param name="user">The user instance.</param>
        public async Task<HttpStatusCode> DoLogin(User user)
        {
            return await _client.PerformLogin(user);
        }

        /// <summary>
        /// Dos the login.
        /// </summary>
        /// <returns>The status code of registration.</returns>
        /// <param name="user">The user to be registered.</param>
        public async Task<HttpStatusCode> DoRegister(User user)
        {
            return await _client.RegisterUser(user);
        }

        public async Task<HttpStatusCode> DeleteCartItems(string username)
        {
            return await _client.DeleteCartItems(username);
        }

    }
}
