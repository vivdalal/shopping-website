using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingWebApi.Models;

namespace ShoppingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ShoppingWebApiContext _context;

        public UsersController(ShoppingWebApiContext context)
        {
            _context = context;
        }        

        // GET: api/Users/5
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public ActionResult GetUser(int id)
        {
            var user = from u in _context.User
                       where u.Id == id
                       select new UserDTO()
                       {
                           Username = u.Username
                       };

            if (user.Count() == 0)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/Users
        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, new { message = "Success" });
        }

        /// <summary>
        /// A helper function to check if the user exists
        /// </summary>
        /// <param name="id">ID of the user</param>
        /// <returns>true if found, false otherwise</returns>
        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
