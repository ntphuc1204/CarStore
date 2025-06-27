using CarStore.Application.Dtos;


namespace CarStore.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<CategoryDto> AddAsync(CategoryCreateDto category);
        Task<bool> UpdateAsync(UpdateCategoryDto category);
        Task<bool> DeleteAsync(int id);
        Task<List<CategoryDto>> SearchAsync(string? key);
    }
}
