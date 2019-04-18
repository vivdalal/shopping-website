using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingWebApi.Models
{
    [Table("Users")]
    public class User
    {

        public int Id { get; set; }

        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }

        public string Role { get; set; }
    }
}
