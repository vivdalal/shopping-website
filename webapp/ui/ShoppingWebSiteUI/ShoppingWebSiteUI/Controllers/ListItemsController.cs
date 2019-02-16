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
            IEnumerable<Product> products = _aPICallService.GetAllProducts().Result;
            ViewBag.Products = products; 
            //var sessionData = HttpContext.Session.GetString("keyname");
            return View("ListItems");
        }

    }
}
