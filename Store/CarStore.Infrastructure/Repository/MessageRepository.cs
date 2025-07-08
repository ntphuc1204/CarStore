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
    public class MessageRepository : IMessageRepository
    {
        private readonly AppDbContext _context;

        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Message>> GetMessagesAsync(int conversationId)
        {
            return await _context.Messages
                .Where(m => m.ConversationId == conversationId)
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<Message> AddMessageAsync(Message message)
        {
            _context.Messages.Add(message);

            var conv = await _context.Conversations.FindAsync(message.ConversationId);
            if (conv != null)
            {
                conv.LastMessageTime = message.SentAt;
            }

            await _context.SaveChangesAsync();
            return message;
        }

        public async Task<List<Message>> GetByIdUser(string id)
        {
            var userId = await _context.Messages.Include(m => m.Conversation).Where(p => p.Conversation.User1Id == id).ToListAsync();
            return userId;
        }
    }
}
