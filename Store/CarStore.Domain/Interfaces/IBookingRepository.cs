using CarStore.Domain.Entities;
using System.Threading.Tasks;
namespace CarStore.Domain.Interfaces
{
    public interface IBookingRepository
    {
        Task AddAsync(Booking booking);
        Task<List<Booking>> GetBookingsByUserIdAsync(string userId);
        Task<List<Booking>> GetAllBookingsAsync();
        Task<Booking?> GetByIdAsync(int id);
        Task UpdateAsync(Booking booking);
        Task CancelledAsync(Booking booking);

        Task<List<Booking>> searchBooking(string key);
        Task<BookingStatisticsDto> GetBookingStatisticsAsync();
    }

}
