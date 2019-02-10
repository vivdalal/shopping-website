using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingWebApi.Models
{
    [Table("User_Account")]
    public class User
    {

        public int Id { get; set; }

        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}
