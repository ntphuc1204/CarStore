using CarStore.Domain.Entities;

namespace CarStore.Domain.Interfaces
{
    public interface IMessageRepository
    {
        Task<List<Message>> GetMessagesAsync(int conversationId);
        Task<Message> AddMessageAsync(Message message);
        Task<List<Message>> GetByIdUser(string id);
    }
}
