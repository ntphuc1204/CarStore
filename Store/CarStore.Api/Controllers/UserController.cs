using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Security.Claims;

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserSevice _service;

        public UserController(IUserSevice service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> getAllUser()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateUserDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID không khớp");

            var result = await _service.UpdateUser(dto);
            if (!result)
                return BadRequest("Cập nhật thất bại");

            return Ok("Cập nhật thành công");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {     
            var result = await _service.GetById(id);
            if(result == null)
            {
                return NotFound();  
            }
            return Ok(result);
        }
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrent()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _service.GetCurrentAsync(userId);
            return Ok(user);
        }
    }
}
