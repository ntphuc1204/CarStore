using CarStore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using CarStore.Domain.Interfaces;
using CarStore.Infrastructure.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using CarStore.Application.Dtos;


namespace CarStore.Infrastructure.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Booking booking)
        {
            var product = await _context.Products.FindAsync(booking.ProductId);
            if (product == null)
                throw new Exception("Sản phẩm không tồn tại.");

            if (product.Quantity < booking.Quantity)
                throw new Exception("Không đủ số lượng sản phẩm.");

            product.Quantity -= booking.Quantity;

            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Booking>> GetBookingsByUserIdAsync(string userId)
        {
            return await _context.Bookings
                .Include(b => b.User)        
                .Include(b => b.Product)     
                    .ThenInclude(p => p.Category)  
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.BookingDate)
                .ToListAsync();
        }

        public async Task<List<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Product)
                    .ThenInclude(p => p.Category)
                .OrderByDescending (b => b.BookingDate)
                .ToListAsync();
        }

        public async Task UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }
        public async Task CancelledAsync(Booking booking)
        {
            var product = await _context.Products.FindAsync(booking.ProductId);
            if (product == null)
                throw new Exception("Sản phẩm không tồn tại.");

            if (product.Quantity < booking.Quantity)
                throw new Exception("Không đủ số lượng sản phẩm.");

            product.Quantity += booking.Quantity;
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<Booking?> GetByIdAsync(int id)
        {
            var bookingId =await _context.Bookings.FindAsync(id);
            return bookingId;
        }

        public async Task<List<Booking>> searchBooking(string key)
        {
            var query = _context.Bookings.
                Include(b => b.User)
                .Include(b => b.Product)
                    .ThenInclude(p => p.Category)
                .OrderByDescending(b => b.BookingDate).AsQueryable();
            if (!string.IsNullOrEmpty(key))
            {
                key = key.ToLower();
                query = query.Where(p => p.User.UserName.ToLower().Contains(key));

            }
            return await query.ToListAsync();
        }

        public async Task<BookingStatisticsDto> GetBookingStatisticsAsync()
        {
            var bookings = await _context.Bookings.ToListAsync();

            return new BookingStatisticsDto
            {
                TotalBookings = bookings.Count,
                Pending = bookings.Count(b => b.Status == 0),
                Confirmed = bookings.Count(b => b.Status == 1),
                Cancelled = bookings.Count(b => b.Status == 2),
                TotalRevenue = bookings
                    .Where(b => b.Status == 1)
                    .Sum(b => b.Total)
            };
        }
    }

}
