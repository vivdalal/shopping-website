using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingWebSiteUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger _logger;
        
        /// <summary>
        /// Initializes the HomeController
        /// </summary>
        /// <param name="logger">The logger</param>
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return Redirect("/Auth/Login");
        }

        /// <summary>
        /// This crashes the website
        /// </summary>
        /// <returns></returns>
        public IActionResult Crash()
        {
            _logger.LogCritical("Application Crashed!");
            throw new Exception();
        }
    }
}
