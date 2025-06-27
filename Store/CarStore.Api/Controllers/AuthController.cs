using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var result = await _authService.RegisterAsync(dto);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

            var result = await _authService.LoginAsync(dto, ipAddress);

            if (result == null)
                return Unauthorized("Email hoặc mật khẩu không đúng.");

            return Ok(result); 
        }

        //[HttpPost("logout")]
        //[Authorize]
        //public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        //{
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    if (userId == null) return Unauthorized();

        //    await _authService.LogoutAsync(userId, request.RefreshToken);
        //    return Ok(new { message = "Logout thành công" });
        //}



        //[HttpPost("refresh-token")]
        //public async Task<IActionResult> RefreshToken([FromBody] RefreshRequest dto)
        //{
        //    var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        //    var result = await _authService.RefreshTokenAsync(dto.RefreshToken, ipAddress);

        //    if (result == null)
        //        return Unauthorized("Refresh token không hợp lệ.");

        //    return Ok(result);
        //}

    }
}
