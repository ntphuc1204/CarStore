using CarStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Domain.Interfaces
{
    public interface IPromotionRepository
    {
        Task<List<Promotion>> GetAllAsync();
        Task<Promotion?> GetByIdAsync(int id);
        public Task<List<Promotion>> GetByProductId(Expression<Func<Promotion, bool>> predicate);

        Task AddAsync(Promotion promotion);
        Task UpdateAsync(Promotion promotion);
        Task<bool> DeleteAsync(int id);
        Task<List<Promotion>> SearchAsync(string key);
    }
}

