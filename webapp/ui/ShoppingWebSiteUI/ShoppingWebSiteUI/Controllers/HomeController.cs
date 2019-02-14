using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ShoppingWebSiteUI.Models;
using ShoppingWebSiteUI.API;
using System.Net;

namespace ShoppingWebSiteUI.Controllers
{
    public class HomeController : Controller
    {
        private APICallService _apiCallService;

        public HomeController(APICallService apiCallService)
        {
            _apiCallService = apiCallService;
        }

        public IActionResult Index()
        {
            var loggedInUser = HttpContext.Session.GetString("username");

            if (loggedInUser == null)
            {
                return View();
            }

            return Redirect("/ListItems");
        }

        public IActionResult Login(string username, string password)
        {
            HttpStatusCode result = _apiCallService.DoLogin(username, password).Result;

            if (result != HttpStatusCode.OK)
            {
                return View();
            }

            HttpContext.Session.SetString("username", username);
            return Redirect("/ListItems");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
