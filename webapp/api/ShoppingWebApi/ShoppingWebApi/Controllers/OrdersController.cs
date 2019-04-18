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
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ShoppingWebApiContext _context;

        public OrdersController(ShoppingWebApiContext context)
        {
            _context = context;
        }

        // GET: api/orders
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IQueryable<OrderDTO>))]
        [HttpGet]
        public IQueryable<OrderDTO> GetCart(string username)
        {

            var userIds = from i in _context.User
                          where username == i.Username
                          select new UserDTO
                          {
                              Id = i.Id,
                              Username = i.Username
                          };

            var user = userIds.First();


            var orders = from i in _context.Cart
                            where i.UserId == user.Id && i.isOrdered
                            select new OrderDTO()
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
            return orders;
        }
    }
}
