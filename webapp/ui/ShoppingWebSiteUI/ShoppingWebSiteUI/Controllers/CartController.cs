using System.Collections.Generic;
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
            //IEnumerable<CartDTO> cartItems = _aPICallService.GetCartItems();
            IEnumerable<Cart> cartItems = new List<Cart>();
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

    }
}



