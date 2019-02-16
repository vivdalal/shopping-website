using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShoppingWebSiteUI.API;
using ShoppingWebSiteUI.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingWebSiteUI.Controllers
{
    public class CartController : Controller
    {
        private APICallService _aPICallService;

        public CartController(APICallService aPICallService)
        {
            _aPICallService = aPICallService;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }


        // The resulting output will be a JSON string: {"p":"Hello","q":"World"}
        [Route("ShoppingCart")]
        public IActionResult onPost()
        {
            //IEnumerable<CartDTO> cartItems = _aPICallService.GetCartItems();
            IEnumerable<CartDTO> cartItems = new List<CartDTO>();
            ViewBag.CartItems = cartItems;
            return View("MyShoppingCart");
        }



    }
}



