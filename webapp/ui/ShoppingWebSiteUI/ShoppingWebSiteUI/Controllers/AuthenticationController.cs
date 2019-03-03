using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ShoppingWebSiteUI.Models;
using ShoppingWebSiteUI.API;
using System.Net;
using Microsoft.Extensions.Logging;

namespace ShoppingWebSiteUI.Controllers
{
    [Route("Auth")]
    public class AuthenticationController : Controller
    {
        private readonly APICallService _apiCallService;
        private readonly ILogger _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:ShoppingWebSiteUI.Controllers.AuthenticationController"/> class.
        /// </summary>
        /// <param name="apiCallService">API call service shared instance.</param>
        /// <param name="logger">The logger for logging events</param>
        public AuthenticationController(APICallService apiCallService, ILogger<AuthenticationController> logger)
        {
            _apiCallService = apiCallService;
            _logger = logger;
        }

        /// <summary>
        /// Get the login view
        /// </summary>
        /// <returns>The Login view</returns>
        [HttpGet]
        [Route("Login")]
        public IActionResult Login()
        {
            var loggedInUser = HttpContext.Session.GetString("username");

            if (loggedInUser == null)
            {
                _logger.LogInformation("User is not authorized. Redirecting to Login page.");
                ViewBag.ShouldShowError = false;
                return View("Login", new User());
            }

            return Redirect("/ListItems");
        }

        /// <summary>
        /// Get the Register view
        /// </summary>
        /// <returns>The Register form view</returns>
        [HttpGet]
        [Route("Register")]
        public IActionResult Register()
        {
            ViewBag.ShouldShowError = false;
            ViewBag.UserAlreadyExists = false;
            HttpContext.Session.Remove("username");
            return View("Register", new User());
        }

        /// <summary>
        /// Login the specified user.
        /// </summary>
        /// <returns>The login.</returns>
        /// <param name="user">User.</param>
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromForm] User user)
        {
            _logger.LogInformation("Authenticating user: {USERNAME}", user.Username);
            HttpStatusCode result = _apiCallService.DoLogin(user).Result;

            if (result != HttpStatusCode.OK)
            {
                _logger.LogInformation("Authentication failed for user: {USERNAME}", user.Username);
                ViewBag.ShouldShowError = true;
                return View("Login", user);
            }

            _logger.LogInformation("Authenticated user: {USERNAME}", user.Username);
            HttpContext.Session.SetString("username", user.Username);
            return Redirect("/ListItems");
        }

        /// <summary>
        /// Registers the specified user.
        /// </summary>
        /// <returns>The login.</returns>
        /// <param name="user">User.</param>
        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromForm] User user)
        {
            HttpStatusCode result = _apiCallService.DoRegister(user).Result;
            ViewBag.ShouldShowError = false;
            ViewBag.UserAlreadyExists = false;

            if (result == HttpStatusCode.Conflict)
            {
                ViewBag.UserAlreadyExists = true;
                return View("Register", user);
            }

            if (result == HttpStatusCode.Created)
            {
                _logger.LogInformation("Created user: {USERNAME}", user.Username);
                _logger.LogInformation("Authenticated user: {USERNAME}", user.Username);
                HttpContext.Session.SetString("username", user.Username);
                return Redirect("/ListItems");                
            }

            ViewBag.ShouldShowError = true;
            return View("Register", user);
        }

        /// <summary>
        /// Login the specified user.
        /// </summary>
        /// <returns>The login.</returns>
        [HttpGet]
        [Route("Logout")]
        public IActionResult Logout()
        {
            string username = HttpContext.Session.GetString("username");

            //Setting the username in the session to null
            HttpContext.Session.Remove("username");
            //Take the user to login screen
            ViewBag.ShouldShowError = false;

            _logger.LogInformation("Authenticating user: {USERNAME}", username);
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
