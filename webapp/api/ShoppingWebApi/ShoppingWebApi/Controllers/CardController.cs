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
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost]
        public async Task<ActionResult<Card>> saveCardDetails([FromBody] Card card)
        {
            try
            {
                bool isExistingCard = _context.Card.Any(c => c.CardNo == card.CardNo);

                if (isExistingCard)
                {
                    return NoContent();
                }
                else
                {
                    _context.Card.Add(card);
                    await _context.SaveChangesAsync();
                    return Created("", new { card = card });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Something went wrong. Please check exception trace. " + e.Message);
                return StatusCode(500);
            }

        }


        // GET: api/Card/{userId}
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OrderDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("{username}")]
        public ActionResult GetCardsForUser(string username)
        {

            try
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
                    Console.WriteLine("No records returned for the username : " + username);
                    return NotFound();
                }

                return Ok(cards);
            }
            catch (Exception e)
            {
                Console.WriteLine("Something went wrong. Please check exception trace. " + e.Message);
                return StatusCode(500);
            }


        }
    }
}
