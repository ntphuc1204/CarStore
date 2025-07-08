using CarStore.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Interfaces
{
    public interface IPromotionService
    {
        Task<List<PromotionDto>> GetAllAsync();

        Task<PromotionDto> GetById(int id);
        Task AddAsync(PromotionCreateDto dto);
        Task<bool> UpdateAsync(PromotionUpdate dto);
        Task<bool> DeleteAsync(int id);
        Task<List<PromotionDto>> GetByProductIdAsync(int productId);
        Task<List<PromotionDto>> SearchAsync(string search);
    }
}
