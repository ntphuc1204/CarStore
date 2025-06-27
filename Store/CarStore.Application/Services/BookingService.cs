using AutoMapper;
using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;


namespace CarStore.Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;

        public BookingService(IBookingRepository bookingRepository, IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }

        public async Task CreateBookingAsync(BookingCreateDto dto, string userId)
        {
            var booking = _mapper.Map<Booking>(dto);
            booking.UserId = userId;
            booking.Status = 0;

            await _bookingRepository.AddAsync(booking);
        }

        public async Task<List<BookingDetailDto>> GetMyBookingsAsync(string userId)
        {
            var bookings = await _bookingRepository.GetBookingsByUserIdAsync(userId);
            return _mapper.Map<List<BookingDetailDto>>(bookings);
        }

        public async Task<List<BookingDetailDto>> GetAllBookingsForAdminAsync()
        {
            var bookings = await _bookingRepository.GetAllBookingsAsync();
            return _mapper.Map<List<BookingDetailDto>>(bookings);
        }

        public async Task ConfirmAsync(int bookingId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null) throw new Exception("Booking không tồn tại");

            booking.Status = 1;
            await _bookingRepository.UpdateAsync(booking);
        }
        public async Task BookingCancelled(int bookingId)
        {

            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
                throw new Exception("Không tìm thấy đơn hàng.");

            booking.Status = 2;
            await _bookingRepository.CancelledAsync(booking);
        }
        public async Task<BookingConfirm?> GetByIdAsync(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            return booking == null ? null : _mapper.Map<BookingConfirm>(booking);
        }

        public async Task<List<BookingDetailDto>> searchBooking(string keyword)
        {
            var result =await  _bookingRepository.searchBooking(keyword);
            return _mapper.Map<List<BookingDetailDto>>(result);
        }
        public async Task<BookingStatisticsDto> GetStatisticsAsync()
        {
            return await _bookingRepository.GetBookingStatisticsAsync();
        }
    }

}
