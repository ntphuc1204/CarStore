using CarStore.Application.Dtos;
using CarStore.Domain.Entities;

namespace CarStore.Application.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(int id);
        Task<ProductDto> CreateAsync(CreateProductDto dto);
        Task<bool> UpdateAsync(UpdateProductDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<ProductDto>> SearchAsync(string? keyword);
        Task<List<ProductDto>> GetByIdCategory(int id);
    }
}
