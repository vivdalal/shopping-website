using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingWebApi.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShoppingWebApi.Controllers
{
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        private readonly ShoppingWebApiContext _context;

        public CardController(ShoppingWebApiContext context)
        {
            _context = context;
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<ActionResult<Card>> saveCardDetails([FromBody] Card card)
        {
            _context.Card.Add(card);
            await _context.SaveChangesAsync();
            return Created("", new { card = card });
        }


        // GET: api/Card/{userId}
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OrderDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{username}")]
        public ActionResult GetCardsForUser(string username)
        {
            var cards = from c in _context.Card
                        where c.Username == username
                       select new CardDTO()
                        {
                            CardNo = c.CardNo,
                            CVV = c.CVV,
                            Username = c.Username,
                            CardName = c.CardName,
                            Expiry = c.Expiry

                        };

            if (cards == null)
            {
                return NotFound();
            }

            return Ok(cards);
        }
    }
}
