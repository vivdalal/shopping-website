using System;
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
    public class ListItemsController : Controller
    {
        private APICallService _aPICallService;

        public ListItemsController(APICallService aPICallService)
        {
            _aPICallService = aPICallService;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Ons the get.
        /// </summary>
        /// <returns>The get.</returns>
        [Route("ListItems")]
        public IActionResult onGet()
        {
            //Get the product catalogue from the API

            //Will handle the HTTP status code error and push again.
            IEnumerable<ProductDTO> products = _aPICallService.GetAllProducts().Result;
            ViewBag.Products = products; 
            //var sessionData = HttpContext.Session.GetString("keyname");
            return View("ListItems");
        }


        [Route("AddToCart")]
        public IActionResult onPost(AddToCartDTO addToCart)
        {
            //Get the product catalogue from the API
            CartDTO cart = new CartDTO();
            cart.Id = int.Parse(addToCart.ProductId);
            cart.Quantity = int.Parse(addToCart.Quantity);
            HttpStatusCode status = _aPICallService.AddToCart(cart).Result;


            //Returning the same view
            return View("ListItems");
        }
    }
}
