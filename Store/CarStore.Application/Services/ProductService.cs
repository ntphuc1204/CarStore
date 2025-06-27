using AutoMapper;
using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;


namespace CarStore.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public ProductService(IProductRepository repository, IMapper mapper, IFileService fileService)
        {
            _repository = repository;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<List<ProductDto>> GetAllAsync()
        {
            var products = await _repository.GetAllAsync();
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            return product != null ? _mapper.Map<ProductDto>(product) : null;
        }
        public async Task<List<ProductDto>> SearchAsync(string? keyword)
        {
            var products = await _repository.SearchAsync(keyword);
            return _mapper.Map<List<ProductDto>>(products);
        }
        public async Task<ProductDto> CreateAsync(CreateProductDto dto)
        {
            var product = _mapper.Map<Product>(dto);
            await _repository.AddAsync(product);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<bool> UpdateAsync(UpdateProductDto dto)
        {
            var product = await _repository.GetByIdAsync(dto.Id);
            if (product == null) { throw new Exception("Product not found"); }

            if (!string.IsNullOrEmpty(dto.NewImage) && dto.NewImage != product.Img)
            {
                await _fileService.DeleteFileAsync(product.Img);
                product.Img = dto.NewImage;
            }

            _mapper.Map(dto, product);
            await _repository.UpdateAsync(product);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return false;

            await _repository.DeleteAsync(product);
            return true;
        }

        public async Task<List<ProductDto>> GetByIdCategory(int id)
        {
            var result = await _repository.GetByIdCategoryAsync(id);
            return _mapper.Map<List<ProductDto>>(result);
        }
    }
}
