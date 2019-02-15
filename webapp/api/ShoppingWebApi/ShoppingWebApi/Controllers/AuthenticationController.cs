using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingWebApi.Models;

namespace ShoppingWebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ShoppingWebApiContext _context;

        public AuthenticationController(ShoppingWebApiContext context)
        {
            _context = context;
        }        

        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return BadRequest();
            }

            if (UserExists(username, password))
            {
                return Ok();
            }

            return Unauthorized();
        }
        
        /// <summary>
        /// Validates the username and password combination
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <param name="password">The password of the user</param>
        /// <returns>true if the combination is valid, false otherwise</returns>
        private bool UserExists(string username, string password)
        {
            return _context.User.Any(e => (e.Username == username && e.Password == password));
        }
    }
}
