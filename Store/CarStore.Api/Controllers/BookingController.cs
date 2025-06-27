using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingsForAdminAsync();
            return Ok(bookings);
        }

        [HttpGet("my")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetMyBookings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var bookings = await _bookingService.GetMyBookingsAsync(userId);
            return Ok(bookings);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingCreateDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Không tìm thấy UserId trong token.");

            await _bookingService.CreateBookingAsync(dto, userId);
            return Ok("Đặt xe thành công");
        }

        [HttpPut("confirm/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ConfirmBooking(int id)
        {
            await _bookingService.ConfirmAsync(id);
            return Ok(new { message = "Đã xác nhận đặt xe" });
        }
        [HttpPut("cancelled/{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CancelledBooking(int id)
        {
            await _bookingService.BookingCancelled(id);
            return Ok(new { message = "Đã hủy đặt xe" });
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search(string keyword)
        {
            var result  = await _bookingService.searchBooking(keyword);
            return Ok(result);
        }
        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            var result = await _bookingService.GetStatisticsAsync();
            return Ok(result);
        }

    }
}
