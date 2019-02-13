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

        [Route("ListItems")]
        public IActionResult onGet()
        {
            //Get the product catalogue from the API
            APICallService aPICallService = new APICallService();

            //var sessionData = HttpContext.Session.GetString("keyname");
            return View("ListItems", aPICallService.GetAllProducts().Result);
        }

        [Route("AddToCart")]
        public IActionResult onPost(ProductDTO product)
        {
            //Get the product catalogue from the API
            APICallService aPICallService = new APICallService();

            //var sessionData = HttpContext.Session.GetString("keyname");
            return View("ListItems", aPICallService.GetAllProducts().Result);
        }
    }
}
