using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ShoppingWebSiteUI.Models;
using ShoppingWebSiteUI.API;
using System.Net;

namespace ShoppingWebSiteUI.Controllers
{
    [Route("Auth")]
    public class AuthenticationController : Controller
    {
        private APICallService _apiCallService;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:ShoppingWebSiteUI.Controllers.AuthenticationController"/> class.
        /// </summary>
        /// <param name="apiCallService">API call service shared instance.</param>
        public AuthenticationController(APICallService apiCallService)
        {
            _apiCallService = apiCallService;
        }

        /// <summary>
        /// Index this instance.
        /// </summary>
        /// <returns>The index.</returns>
        [HttpGet]
        [Route("Login")]
        public IActionResult Login()
        {
            var loggedInUser = HttpContext.Session.GetString("username");

            if (loggedInUser == null)
            {
                ViewBag.ShouldShowError = false;
                return View("Login", new User());
            }

            return Redirect("/ListItems");
        }

        /// <summary>
        /// Login the specified user.
        /// </summary>
        /// <returns>The login.</returns>
        /// <param name="user">User.</param>
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] User user)
        {
            HttpStatusCode result = _apiCallService.DoLogin(user).Result;

            if (result != HttpStatusCode.OK)
            {
                ViewBag.ShouldShowError = true;
                return View("Login", user);
            }

            HttpContext.Session.SetString("username", user.Username);
            return Redirect("/ListItems");
        }

        /// <summary>
        /// Login the specified user.
        /// </summary>
        /// <returns>The login.</returns>
        /// <param name="user">User.</param>
        [HttpGet]
        [Route("Logout")]
        public IActionResult Logout()
        {
            //Setting the username in the session to null
            HttpContext.Session.SetString("username", null);
            //Take the user to login screen
            ViewBag.ShouldShowError = false;
            return View("Login", new User());
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
