using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _service.GetByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
        {
            var product = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var success = await _service.UpdateAsync(dto);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadProductImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File không hợp lệ");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { fileName });
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string? key)
        {
            var result = await _service.SearchAsync(key);
            return Ok(result);
        }
        [HttpGet("pagination")]
        public async Task<IActionResult> GetAllByPagination([FromQuery] PhanTrrang pagination)
        {
            var listProduct = await _service.GetAllAsync();
            var query = listProduct.AsQueryable();

            var totalItems = query.Count();
            var items = query.Skip((pagination.Page - 1) * pagination.PageSize).
                Take(pagination.PageSize).ToList();
            return Ok(new
            {
                data = items,
                currentPage = pagination.Page,
                pageSize = pagination.PageSize,
                totalItems,
                totalPages = (int)Math.Ceiling((double)totalItems / pagination.PageSize)
            });
        }
        [HttpGet("category/{id}")]
        public async Task<IActionResult> GetByIdCategory(int id)
        {
            var result = await _service.GetByIdCategory(id);
            return Ok(result);
        }
    }
}
