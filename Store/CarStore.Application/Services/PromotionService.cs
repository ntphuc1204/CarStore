using AutoMapper;
using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;


namespace CarStore.Application.Services
{
    public class PromotionService : IPromotionService
    {
        private readonly IPromotionRepository _repo;
        private readonly IMapper _mapper;

        public PromotionService(IPromotionRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<PromotionDto>> GetAllAsync()
        {
            var entities = await _repo.GetAllAsync();
            return _mapper.Map<List<PromotionDto>>(entities);
        }

        public async Task AddAsync(PromotionCreateDto dto)
        {
            var entity = _mapper.Map<Promotion>(dto);
            await _repo.AddAsync(entity);
        }

        public async Task<bool> UpdateAsync(PromotionUpdate dto)
        {
            var promotion = await _repo.GetByIdAsync(dto.Id);
            if (promotion == null)
            {
                throw new Exception("Promotion không tồn tại");
            }

            _mapper.Map(dto, promotion);
            await _repo.UpdateAsync(promotion);
            return true;
        }


        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            return true;
        }
        public async Task<List<PromotionDto>> GetByProductIdAsync(int productId)
        {
            var now = DateTime.Now;

            var promotions = await _repo.GetByProductId(
                p => p.ProductId == productId &&
                     p.StartDate <= now &&
                     p.EndDate >= now &&
                     p.Quantity > 0
            );

            return _mapper.Map<List<PromotionDto>>(promotions);
        }

        public async Task<PromotionDto> GetById(int id)
        {
            var result = await _repo.GetByIdAsync(id);
            if (result == null) throw new Exception("Promotion không tồn tại");
            return _mapper.Map<PromotionDto>(result);
        }

        public async Task<List<PromotionDto>> SearchAsync(string search)
        {
            var result = await _repo.SearchAsync(search);
            return _mapper.Map<List<PromotionDto>>(result);
        }
    }

}
