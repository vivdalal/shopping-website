using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingWebApi.Models
{
    [Table("Card")]
    public class Card
    {
        public int Id { get; set; }

        [Required]
        [Column("card_no")]
        public long CardNo { get; set; }

        [Required]
        [Column("cvv")]
        public int CVV { get; set; }

        [Required]
        [Column("expiry")]
        public string Expiry { get; set; }

        [Required]
        [Column("card_name")]
        public string CardName { get; set; }

        // Foreign keys
        [Required]
        [Column("username")]
        public string Username { get; set; }

    }
}
