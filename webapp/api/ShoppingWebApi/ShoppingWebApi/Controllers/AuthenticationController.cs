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

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Route("login")]
        [HttpPost]
        public ActionResult Authenticate([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest();
            }

            if (ValidateUser(user))
            {
                return Ok();
            }

            return Unauthorized();
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Route("login/admin")]
        [HttpPost]
        public ActionResult AuthenticateAdmin([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest();
            }

            if (ValidateAdmin(user))
            {
                return Ok();
            }

            return Unauthorized();
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> Register([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest();
            }

            if (UserExists(user))
            {
                return Conflict();
            }

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return Created("", new { id = user.Id });
        }

        /// <summary>
        /// Checks if user is already in the database
        /// </summary>
        /// <param name="user">The credentials of the user</param>
        /// <returns>true if the user exists, false otherwise</returns>
        private bool UserExists(User user)
        {
            return _context.User.Any(e => (e.Username == user.Username));
        }

        /// <summary>
        /// Validates the username and password combination
        /// </summary>
        /// <param name="user">The credentials of the user</param>
        /// <returns>true if the combination is valid, false otherwise</returns>
        private bool ValidateUser(User user)
        {
            return _context.User.Any(e => (e.Username == user.Username && e.Password == user.Password));
        }

        /// <summary>
        /// Validates the username and password combination for admin access
        /// </summary>
        /// <param name="user">The credentials of the user</param>
        /// <returns>true if the combination is valid, false otherwise</returns>
        private bool ValidateAdmin(User user)
        {
            return _context.User.Any(e => (e.Username == user.Username && e.Password == user.Password && e.Role == "admin"));
        }
    }
}
