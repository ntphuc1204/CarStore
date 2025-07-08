using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private readonly IPromotionService _service;

        public PromotionsController(IPromotionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PromotionCreateDto dto)
        {
            await _service.AddAsync(dto);
            return Ok(new { message = "Thêm khuyến mãi thành công!" });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(PromotionUpdate dto,int id)
        {
            if (id != dto.Id)
            {
                return NotFound();
            }
            var update = await _service.UpdateAsync(dto);
            return Ok(update);        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);    
            return Ok(result);
        }

        [HttpGet("by-product/{productId}")]
        public async Task<IActionResult> GetByProductId(int productId)
        {
            var result = await _service.GetByProductIdAsync(productId);
            return Ok(result);
        }
        [HttpGet("by-id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetById(id);
            return Ok(result);
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search(string key)
        {
            var result = await _service.SearchAsync(key);
            return Ok(result);
        }
    }

}
