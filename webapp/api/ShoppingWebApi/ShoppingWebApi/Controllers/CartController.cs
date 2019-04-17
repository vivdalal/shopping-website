using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingWebApi.Models;

namespace ShoppingWebApi.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ShoppingWebApiContext _context;

        public CartController(ShoppingWebApiContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IQueryable<CartDTO>))]
        [HttpGet]
        public IQueryable<CartDTO> GetCart(String username)
        {

            var userIds = from i in _context.User
                          where username == i.Username
                          select new UserDTO
                          {
                              Id = i.Id,
                              Username = i.Username
                          };

            var user = userIds.First();


            var cartItems = from i in _context.Cart
                            where i.UserId == user.Id && !i.isOrdered 
                            select new CartDTO()
                            {
                                Id = i.Id,
                                Quantity = i.Quantity,
                                Price = i.Price,
                                CreatedAt = i.CreatedAt,
                                Product = new ProductDTO()
                                {
                                    Id = i.Product.Id,
                                    Name = i.Product.Name,
                                    Description = i.Product.Description,
                                    Price = i.Product.Price,
                                    IsInStock = i.Product.Quantity != 0,
                                    Category = i.Product.Category,
                                    ImageUrl = i.Product.ImageUrl
                                }
                            };
            return cartItems;





        }

        // GET: api/Cart/5
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public ActionResult<CartDTO> GetCart(int id)
        {
            var cartItem = from i in _context.Cart
                           where i.Id == id
                           select new CartDTO()
                           {
                               Id = i.Id,
                               Quantity = i.Quantity,
                               Price = i.Price,
                               CreatedAt = i.CreatedAt,
                               Product = new ProductDTO()
                               {
                                   Id = i.Product.Id,
                                   Name = i.Product.Name,
                                   Description = i.Product.Description,
                                   Price = i.Product.Price,
                                   IsInStock = i.Product.Quantity != 0,
                                   Category = i.Product.Category,
                                   ImageUrl = i.Product.ImageUrl
                               }
                           };

            if (cartItem == null)
            {
                // Send 404 if not such cart item is found
                return NotFound();
            }

            return Ok(cartItem);
        }

        // PUT: api/Carts/5
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carts
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart([FromBody] CartItemDTO cartItem)
        {
            Product product = await _context.Product.FirstOrDefaultAsync(p => p.Id == cartItem.ProductID);

            if (product == null)
            {
                return BadRequest(new { message = "Invalid product id" });
            }

            User user = await _context.User.FirstOrDefaultAsync(u => u.Username == cartItem.Username);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid username" });
            }

            Cart cart = new Cart();
            cart.Product = product;
            cart.Quantity = cartItem.Quantity;
            cart.User = user;
            cart.Price = cartItem.Quantity * product.Price;

            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, new { message = "Success" });
        }

        // DELETE: api/Carts/5
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete]
        [Route("{username}")]
        public async Task<ActionResult<Cart>> DeleteCart(string username)
        {

            var userIds = from i in _context.User
                          where username == i.Username
                          select new UserDTO
                          {
                              Id = i.Id,
                              Username = i.Username
                          };

            var user = userIds.First();


            var cartItems = from i in _context.Cart
                            where i.UserId == user.Id
                            select new CartDTO()
                            {
                                Id = i.Id,
                                Quantity = i.Quantity,
                                Price = i.Price,
                                CreatedAt = i.CreatedAt,
                                Product = new ProductDTO()
                                {
                                    Id = i.Product.Id,
                                    Name = i.Product.Name,
                                    Description = i.Product.Description,
                                    Price = i.Product.Price,
                                    IsInStock = i.Product.Quantity != 0,
                                    Category = i.Product.Category,
                                    ImageUrl = i.Product.ImageUrl
                                }
                            };

            //Deleting all entries for the user
            foreach (var c in cartItems)
            {
                var cart = await _context.Cart.FindAsync(c.Id);
                if (cart == null)
                {
                    return NotFound();

                }

                cart.isOrdered = true;
                _context.Cart.Update(cart);
                await _context.SaveChangesAsync();

            }




            return NoContent();
        }

        /// <summary>
        /// Checks if the cart with the given id exists
        /// </summary>
        /// <param name="id">The id of the cart</param>
        /// <returns>true if the cart exists, false otherwise</returns>
        private bool CartExists(int id)
        {
            return _context.Cart.Any(e => e.Id == id);
        }
    }
}
