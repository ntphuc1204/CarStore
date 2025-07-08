using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;
using CarStore.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Infrastructure.Repository
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly AppDbContext _context;

        public ConversationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Conversation?> GetByUsersAsync(string user1Id, string user2Id)
        {
            return await _context.Conversations.FirstOrDefaultAsync(c =>
                (c.User1Id == user1Id && c.User2Id == user2Id) ||
                (c.User1Id == user2Id && c.User2Id == user1Id));
        }

        public async Task<Conversation> CreateAsync(Conversation conversation)
        {
            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();
            return conversation;
        }

        public async Task<List<Conversation>> GetUserConversationsAsync(string userId)
        {
            return await _context.Conversations
                .Where(c => c.User1Id == userId || c.User2Id == userId).OrderByDescending(p => p.LastMessageTime)
                .Include(c => c.Messages.OrderByDescending(m => m.SentAt).Take(1))
                .ToListAsync();
        }
    }
}
