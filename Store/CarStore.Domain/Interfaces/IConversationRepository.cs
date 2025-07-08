using CarStore.Domain.Entities;

namespace CarStore.Domain.Interfaces
{
    public interface IConversationRepository
    {
        Task<Conversation?> GetByUsersAsync(string user1Id, string user2Id);
        Task<Conversation> CreateAsync(Conversation conversation);
        Task<List<Conversation>> GetUserConversationsAsync(string userId);
    }
}
