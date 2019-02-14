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

        /// <summary>
        /// Initializes a new instance of the <see cref="T:ShoppingWebSiteUI.Controllers.HomeController"/> class.
        /// </summary>
        /// <param name="apiCallService">API call service.</param>
        public HomeController(APICallService apiCallService)
        {
            _apiCallService = apiCallService;
        }

        /// <summary>
        /// Index this instance.
        /// </summary>
        /// <returns>The index.</returns>
        public IActionResult Index()
        {
            var loggedInUser = HttpContext.Session.GetString("username");

            if (loggedInUser == null)
            {
                return View();
            }

            return Redirect("/ListItems");
        }

        /// <summary>
        /// Logins the user.
        /// </summary>
        /// <returns>The user.</returns>
        [Route("Login")]
        public IActionResult LoginUser()
        {
            User user = new User();
            return View("Login", user);
        }

        /// <summary>
        /// Login the specified user.
        /// </summary>
        /// <returns>The login.</returns>
        /// <param name="user">User.</param>
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

        /// <summary>
        /// Error this instance.
        /// </summary>
        /// <returns>The error.</returns>
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
