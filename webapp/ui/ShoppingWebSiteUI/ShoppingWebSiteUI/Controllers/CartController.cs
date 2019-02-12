﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingWebSiteUI.Controllers
{
    public class CartController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }


        // The resulting output will be a JSON string: {"p":"Hello","q":"World"}
        [Route("ShoppingCart")]
        public IActionResult onPost(String words)
        { 
            return View("MyShoppingCart");
        }



    }
}



