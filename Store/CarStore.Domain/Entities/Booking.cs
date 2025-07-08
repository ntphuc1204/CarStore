using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Domain.Entities
{
    public class Booking
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }   

        public int ProductId { get; set; }
        public Product Product { get; set; }       

        public int Quantity { get; set; }

        public double Total { get; set; }
        public DateTime BookingDate { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }
        public int? PromotionId { get; set; }
        public Promotion? Promotion { get; set; }

    }
    public class BookingStatisticsDto
    {
        public int TotalBookings { get; set; }
        public int Pending { get; set; }
        public int Confirmed { get; set; }
        public int Cancelled { get; set; }
        public double TotalRevenue { get; set; }
    }
}
