using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingWebApi.Models;

namespace ShoppingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ShoppingWebApiContext _context;

        public ProductsController(ShoppingWebApiContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IQueryable<ProductDTO>))]
        [HttpGet]
        public IQueryable<ProductDTO> GetProduct()
        {
            var products = from p in _context.Product
                           select new ProductDTO()
                           {
                               Id = p.Id,
                               Name = p.Name,
                               Description = p.Description,
                               Price = p.Price,
                               IsInStock = p.Quantity != 0,
                               Category = p.Category,
                               ImageUrl = p.ImageUrl
                           };

            return products;
        }

        // GET: api/Products/5
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public ActionResult<ProductDTO> GetProduct(int id)
        {
            var product = from p in _context.Product
                          where p.Id == id
                          select new ProductDTO()
                          {
                              Id = p.Id,
                              Name = p.Name,
                              Description = p.Description,
                              Price = p.Price,
                              IsInStock = p.Quantity != 0,
                              Category = p.Category,
                              ImageUrl = p.ImageUrl
                          };

            if (product == null)
            {
                // Send 404 if not such product is found
                return NotFound();
            }

            return Ok(product);
        }

        /// <summary>
        /// A helper function to check if the user exists
        /// </summary>
        /// <param name="id">ID of the product</param>
        /// <returns>true if found, false otherwise</returns>
        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }

        /// <summary>
        /// Posts the product.
        /// </summary>
        /// <returns>The product.</returns>
        /// <param name="productItem">Product item.</param>
        // POST: api/Products
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product productItem)
        {

            if (productItem == null)
            {
                return BadRequest(new { message = "Invalid product. Please check" });
            }

            _context.Product.Add(productItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostProduct", new { id = productItem.Id }, new { message = "Success. " + "Product ID: " + productItem.Id });
        }
    }
}
