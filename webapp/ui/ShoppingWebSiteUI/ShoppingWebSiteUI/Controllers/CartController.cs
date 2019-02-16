using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingWebSiteUI.API;
using ShoppingWebSiteUI.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingWebSiteUI.Controllers
{
    public class CartController : Controller
    {
        private readonly APICallService _aPICallService;

        public CartController(APICallService aPICallService)
        {
            _aPICallService = aPICallService;
        }
        
        // The resulting output will be a JSON string: {"p":"Hello","q":"World"}
        [Route("ShoppingCart")]
        public IActionResult onPost()
        {
            string username = HttpContext.Session.GetString("username");

            IEnumerable<Cart> cartItems = _aPICallService.GetCartItems(username).Result;
            //IEnumerable<Cart> cartItems = new List<Cart>();
            ViewBag.Username = username ?? "";
            ViewBag.CartItems = cartItems;
            return View("MyShoppingCart");
        }

        [Route("Cart")]
        [HttpPost]
        public async Task<HttpStatusCode> onPost([FromBody] CartItem cartItem)
        {
            cartItem.Username = HttpContext.Session.GetString("username");

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
        [HttpGet]
        public IActionResult onSuccess()
        {

            //Deleting the cart items when the user hits the checkout button
            string username = HttpContext.Session.GetString("username");
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



