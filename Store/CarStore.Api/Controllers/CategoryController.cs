using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());


        [HttpPost]
        public async Task<IActionResult> Create(CategoryCreateDto dto)
        {
            var result = await _service.AddAsync(dto);
            return Ok(new { data = result });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return Ok(new { data = result });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id,UpdateCategoryDto dto)
        {
            if(id != dto.Id) return BadRequest();
            var newUpdate = await _service.UpdateAsync(dto);
            return Ok(new { success = newUpdate });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchCategory(string key)
        {
            var result = await _service.SearchAsync(key);
            return Ok(result);              
        }
    }
}
