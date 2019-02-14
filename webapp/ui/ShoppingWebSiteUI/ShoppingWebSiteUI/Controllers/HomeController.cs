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

        [Route("Login")]
        public IActionResult LoginUser()
        {
            User user = new User();
            return View("Login", user);
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(User user)
        {
            HttpStatusCode result = _apiCallService.DoLogin(user).Result;

            if (result != HttpStatusCode.OK)
            {
                return View("Login", User);
            }

            HttpContext.Session.SetString("username", user.Username);
            return Redirect("/ListItems");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
