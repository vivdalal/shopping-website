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

            //Will handle the HTTP status code error and push again.
            IEnumerable<ProductDTO> products = aPICallService.GetAllProducts().Result;
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
