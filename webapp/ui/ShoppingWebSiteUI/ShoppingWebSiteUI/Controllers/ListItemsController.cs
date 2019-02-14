using System;
using System.Collections.Generic;
using System.Linq;
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
            APICallService aPICallService = new APICallService();

            //ViewBag["Products"] = aPICallService.GetAllProducts().Result;
            List<ProductDTO> products = new List<ProductDTO>()
            {
                new ProductDTO("White Shirt", "White colored shirt", 30, true),
                new ProductDTO("Blue Shirt", "White colored shirt", 40, true),
                new ProductDTO("Green Shirt", "White colored shirt", 50, true),
                new ProductDTO("Pink Shirt", "White colored shirt", 60, true),
                new ProductDTO("Red Shirt", "White colored shirt", 70, true),
                new ProductDTO("Orange Shirt", "White colored shirt", 80, true),
                new ProductDTO("Yellow Shirt", "White colored shirt", 90, true),
                new ProductDTO("Black Shirt", "White colored shirt", 90, true),
                new ProductDTO("White Trouser", "White colored shirt", 30, true),
                new ProductDTO("Blue Trouser", "White colored shirt", 40, true),
                new ProductDTO("Green Trouser", "White colored shirt", 50, true),
                new ProductDTO("Pink Trouser", "White colored shirt", 60, true),
                new ProductDTO("Red Trouser", "White colored shirt", 70, true),
                new ProductDTO("Orange Trouser", "White colored shirt", 80, true),
                new ProductDTO("Yellow Trouser", "White colored shirt", 90, true),
                new ProductDTO("Black Trouser", "White colored shirt", 90, true),
                new ProductDTO("White Socks", "White colored shirt", 30, true),
                new ProductDTO("Blue Socks", "White colored shirt", 40, true),
                new ProductDTO("Green Socks", "White colored shirt", 50, true),
                new ProductDTO("Pink Socks", "White colored shirt", 60, true),
                new ProductDTO("Red Socks", "White colored shirt", 70, true),
                new ProductDTO("Orange Socks", "White colored shirt", 80, true),
                new ProductDTO("Yellow Socks", "White colored shirt", 90, true),
                new ProductDTO("Black Socks", "White colored shirt", 90, true),
                new ProductDTO("White Shoes", "White colored shirt", 30, true),
                new ProductDTO("Blue Shoes", "White colored shirt", 40, true),
                new ProductDTO("Green Shoes", "White colored shirt", 50, true),
                new ProductDTO("Pink Shoes", "White colored shirt", 60, true),
                new ProductDTO("Red Shoes", "White colored shirt", 70, true),
                new ProductDTO("Orange Shoes", "White colored shirt", 80, true),
                new ProductDTO("Yellow Shoes", "White colored shirt", 90, true),
                new ProductDTO("Black Shoes", "White colored shirt", 90, true),

            };
            ViewBag.Products = products;
            //var sessionData = HttpContext.Session.GetString("keyname");
            return View("ListItems");
        }


        [Route("AddToCart")]
        public IActionResult onPost(ProductDTO product)
        {
            //Get the product catalogue from the API
            APICallService aPICallService = new APICallService();

            //var sessionData = HttpContext.Session.GetString("keyname");
            //Updating the Cart
            //Creating new Cart element as of now. Need to discuss how to have the same cart throughout all service calls



            //Returning the same view
            return View("ListItems", aPICallService.GetAllProducts().Result);
        }
    }
}
