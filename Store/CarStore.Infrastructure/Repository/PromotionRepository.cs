using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;
using CarStore.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace CarStore.Infrastructure.Repository
{
    public class PromotionRepository : IPromotionRepository
    {
        private readonly AppDbContext _context;
        public PromotionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Promotion>> GetAllAsync()
        {
            return await _context.Promotions
                .Where(p => !p.IsDeleted)
                .Include(p => p.Product)
                .ToListAsync();
        }


        public async Task<Promotion?> GetByIdAsync(int id)
        {
            return await _context.Promotions.FindAsync(id);
        }

        public async Task AddAsync(Promotion promotion)
        {
            _context.Promotions.Add(promotion);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Promotion promotion)
        {
            var editPromotion = _context.Promotions.Update(promotion);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var promo = await _context.Promotions.FindAsync(id);
            if (promo == null) return false;

            promo.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Promotion>> GetByProductId(Expression<Func<Promotion, bool>> predicate)
        {
            return await _context.Promotions
               .Where(predicate)
               .OrderByDescending(p => p.StartDate)
               .ToListAsync();
        }

        public async Task<List<Promotion>> SearchAsync(string key)
        {
            var promo = _context.Promotions.Where(p=> p.IsDeleted == false).AsQueryable();
            if (!string.IsNullOrWhiteSpace(key))
            {
                key = key.ToLower();
                promo = promo.Where(p => p.Title.ToLower().Contains(key));
            }
            return await promo.ToListAsync();
        }
    }

}
