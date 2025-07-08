using CarStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Interfaces
{
    public interface IConversationService
    {
        Task<Conversation> GetOrCreateConversationAsync(string user1Id, string user2Id);
        Task<List<Conversation>> GetUserConversationsAsync(string userId);
    }
}
