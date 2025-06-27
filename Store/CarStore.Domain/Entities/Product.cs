

namespace CarStore.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public int CategoryID { get; set; }
        public string Name { get; set; }

        public string Img { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Category? Category { get; set; }

    }
}
