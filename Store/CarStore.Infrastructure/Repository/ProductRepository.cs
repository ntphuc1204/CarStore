using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;
using CarStore.Infrastructure.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products
            .Include(p => p.Category).OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Product>> SearchAsync(string? keyword)
        {
            var query = _context.Products.Include(p => p.Category).AsQueryable();
            if (!string.IsNullOrWhiteSpace(keyword))
            {
                keyword = keyword.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(keyword));
            }
            return await query.ToListAsync();
        }

        public async Task<List<Product>> GetByIdCategoryAsync(int id)
        {
            if(id == null)
            {
                return await _context.Products
                .Include(p => p.Category).OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
            }
            return await _context.Products
                .Include(p => p.Category)
                .Where(p => p.Category.Id == id)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync(); 
        }

    }
}
