using CarStore.Application.Dtos;
using CarStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Interfaces
{
    public interface IBookingService
    {
        Task CreateBookingAsync(BookingCreateDto dto, string userId);
        Task<List<BookingDetailDto>> GetMyBookingsAsync(string userId);
        Task<List<BookingDetailDto>> GetAllBookingsForAdminAsync();
        Task ConfirmAsync(int bookingId);
        Task<BookingConfirm?> GetByIdAsync(int id);
        Task BookingCancelled(int id);
        Task<List<BookingDetailDto>> searchBooking(string keywword);
        Task<BookingStatisticsDto> GetStatisticsAsync();
        Task Ship(int id);
    }

}
