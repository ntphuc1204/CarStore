

namespace CarStore.Application.Dtos
{
    public class BookingCreateDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public double Total { get; set; }
        public DateTime BookingDate { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }
        public int? PromotionId { get; set; }
    }
    public class BookingDetailDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public int Quantity { get; set; }
        public double Total { get; set; }
        public DateTime BookingDate { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }
        public int? PromotionID { get; set; }
        public string? PromotionTitle {  get; set; }
        public double? DiscountPercent { get; set; }
        public ProductDto Product { get; set; }
    }
    public class BookingConfirm
    {
        public int Id { get; set; }
        public int Status {  get; set; }
    }
    

}
