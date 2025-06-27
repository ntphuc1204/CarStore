using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;
using CarStore.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace CarStore.Infrastructure.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Category category)
        {
            var addNew = _context.Categories.Add(category);
            await _context.SaveChangesAsync();

        }

        public async Task DeleteAsync(Category category)
        {
            var delete = _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            var result = await _context.Categories.ToListAsync();
            return result;
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            var categoryId = await _context.Categories.FindAsync(id);
            return categoryId;

        }
        public async Task UpdateAsync(Category category)
        {
            var update = _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Category>> SearchAsync(string keyword)
        {
            var query = _context.Categories.AsQueryable();
            if (!string.IsNullOrWhiteSpace(keyword))
            {
                keyword = keyword.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(keyword));
            }
            return await query.ToListAsync();
        }
    }
}
