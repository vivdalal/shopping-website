﻿namespace ShoppingWebApi.Models
{
    public class CartDTO
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public float Price { get; set; }

        public byte[] CreatedAt { get; set; }

        public ProductDTO Product { get; set; }
    }
}