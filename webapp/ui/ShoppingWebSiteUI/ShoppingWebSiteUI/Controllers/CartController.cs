using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShoppingWebSiteUI.API;
using ShoppingWebSiteUI.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingWebSiteUI.Controllers
{
    public class CartController : Controller
    {
        private readonly APICallService _aPICallService;

        private readonly ILogger _logger;

        public CartController(APICallService aPICallService, ILogger<CartController> logger)
        {
            _aPICallService = aPICallService;
            _logger = logger;
        }
        
        [Route("ShoppingCart")]
        public IActionResult onPost()
        {
            string username = HttpContext.Session.GetString("username");

            IEnumerable<Cart> cartItems = _aPICallService.GetCartItems(username).Result;
            IEnumerable<Card> cards = _aPICallService.GetCards(username).Result;

            ViewBag.Username = username ?? "";
            ViewBag.CartItems = cartItems;
            ViewBag.Cards = cards;

            _logger.LogInformation("User {USERNAME} visited cart page.", username);

            return View("MyShoppingCart");
        }

        [Route("Cart")]
        [HttpPost]
        public async Task<HttpStatusCode> onPost([FromBody] CartItem cartItem)
        {
            cartItem.Username = HttpContext.Session.GetString("username");

            // Logging the products
            _logger.LogInformation("User {USERNAME} added Product ID: {PRODUCT} ({QUANTITY}) to cart", cartItem.Username, cartItem.ProductId, cartItem.Quantity);

            return await _aPICallService.AddToCart(cartItem);

        }


        [Route("CheckCart")]
        [HttpGet]
        public IActionResult checkCart()
        {
            string username = HttpContext.Session.GetString("username");
            IEnumerable<Cart> cartItems = _aPICallService.GetCartItems(username).Result;
            if(cartItems != null && cartItems.Any())
            {
                return StatusCode(200);
            }
            else
            {
                return StatusCode(500);
            }

        }


        [Route("Success")]
        [HttpPost]
        public IActionResult onSuccess([FromForm] Card card)
        {
            //Deleting the cart items when the user hits the checkout button
            string username = HttpContext.Session.GetString("username");

            card.Username = username;

            HttpStatusCode savedCardStatus = _aPICallService.AddToCards(card).Result;
            HttpStatusCode status = _aPICallService.DeleteCartItems(username).Result;
            if(status == HttpStatusCode.OK)
            {
                return View("Success");
            }
            else
            {
                return StatusCode(500);
            }
        }
    }
}



