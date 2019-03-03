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

        [Timestamp]
        [Column("created_at")]
        public byte[] CreatedAt { get; set; }

        // Foreign keys
        [Required]
        [Column("user_id")]
        public int UserId { get; set; }

        // Navigation
        public User User { get; set; }
    }
}
