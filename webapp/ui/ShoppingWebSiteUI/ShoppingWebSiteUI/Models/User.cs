using System;
using System.ComponentModel.DataAnnotations;

namespace ShoppingWebSiteUI.Models
{
    public class User
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
