using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingWebApi.Models;

namespace ShoppingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticatorController : ControllerBase
    {

        private readonly ShoppingWebApiContext _context;

        public AuthenticatorController(ShoppingWebApiContext context)
        {
             _context = context;
        }

        /// <summary>
        /// Checks the user credentials.
        /// </summary>
        /// <returns>The user credentials.</returns>
        /// <param name="user">User.</param>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPost]
        public ActionResult CheckUserCredentials(User user)
        {
            var userFromDB = from u in _context.User
                       where u.Username == user.Username && u.Password == user.Password
                       select new UserDTO()
                       {
                           Username = u.Username
                       };

            if(userFromDB != null && userFromDB.Any())
            {
                return Ok();
            }

            return NotFound();

        }
    }
}
