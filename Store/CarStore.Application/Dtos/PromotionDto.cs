using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Dtos
{
    public class PromotionDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public double DiscountPercent { get; set; }
        public int Quantity { get; set; }
        public int InitialQuantity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = "";
        public int ProductId { get; set; }
    }
    public class PromotionCreateDto
    {
        public string Title { get; set; } = "";
        public double DiscountPercent { get; set; }
        public int Quantity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ProductId { get; set; }
    }

    public class PromotionUpdate
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public double DiscountPercent { get; set; }
        public int Quantity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int ProductId { get; set; }
    }
}
