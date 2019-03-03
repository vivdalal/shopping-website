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

        // GET: api/Orders/5
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OrderDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public ActionResult GetOrder(int id)
        {
            var order = from o in _context.Order
                        where o.Id == id
                        select new OrderDTO()
                        {
                            Id = o.Id,
                            ProductName = o.Product.Name,
                            ProductDescription = o.Product.Description,
                            Quantity = o.Quantity,
                            Price = o.Price,
                            CreatedAt = o.CreatedAt
                        };

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // POST: api/Orders
        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Order.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrder", new { id = order.Id }, new { message = "Success" });
        }
    }
}
