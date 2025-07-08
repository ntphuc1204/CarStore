using AutoMapper;
using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _repo;
        private readonly IMapper _mapper;

        public MessageService(IMessageRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<MessageByUserDto>> GetByIdUser(string id)
        {
            var mes =await _repo.GetByIdUser(id);
            return _mapper.Map<List<MessageByUserDto>>(mes);
        }

        public async Task<List<MessageDto>> GetMessagesAsync(int conversationId)
        {
            var messages = await _repo.GetMessagesAsync(conversationId);
            return _mapper.Map<List<MessageDto>>(messages);
        }

        public async Task<MessageDto> SendMessageAsync(int conversationId, string senderId, string content)
        {
            var message = new Message
            {
                ConversationId = conversationId,
                SenderId = senderId,
                Content = content,
                SentAt = DateTime.UtcNow,
                IsRead = false
            };

            var result = await _repo.AddMessageAsync(message);
            return _mapper.Map<MessageDto>(result);
        }
    }
}
