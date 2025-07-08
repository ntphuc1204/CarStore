using CarStore.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Interfaces
{
    public interface IMessageService
    {
        Task<List<MessageDto>> GetMessagesAsync(int conversationId);
        Task<MessageDto> SendMessageAsync(int conversationId, string senderId, string content);
        Task<List<MessageByUserDto>> GetByIdUser(string id);
    }
}
