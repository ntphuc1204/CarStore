using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int CategoryID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Img { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
    public class CreateProductDto
    {
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateProductDto
    {
        public int Id { get; set; }
        public int CategoryID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? NewImage { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
    public class PhanTrrang
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
