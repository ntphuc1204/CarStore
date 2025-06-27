using AutoMapper;
using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;


namespace CarStore.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public CategoryService(ICategoryRepository repo, IMapper mapper, IFileService fileService)
        {
            _repo = repo;
            _mapper = mapper;
            _fileService = fileService;
        }
        public async Task<CategoryDto> AddAsync(CategoryCreateDto category)
        {
            var addNew = _mapper.Map<Category>(category);
            await _repo.AddAsync(addNew);
            return _mapper.Map<CategoryDto>(addNew);
        }
        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var category = await _repo.GetByIdAsync(id);
            return category != null ? _mapper.Map<CategoryDto>(category) : null;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _repo.GetByIdAsync(id);
            if (category == null) return false;
            await _repo.DeleteAsync(category);
            return true;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            var result = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<CategoryDto>>(result);
        }

        public async Task<bool> UpdateAsync(UpdateCategoryDto dto)
        {
            var category = await _repo.GetByIdAsync(dto.Id);
            if (category == null) throw new Exception("Product not found");

            if (!string.IsNullOrEmpty(dto.NewLogo) && dto.NewLogo != category.Logo)
            {
                await _fileService.DeleteFileAsync(category.Logo);
                category.Logo = dto.NewLogo;
            }

            _mapper.Map(dto, category);
            await _repo.UpdateAsync(category);
            return true;
        }
        public async Task<List<CategoryDto>> SearchAsync(string search) 
        {
            var category =await _repo.SearchAsync(search);
            return _mapper.Map<List<CategoryDto>>(category);
        }
    }
}
