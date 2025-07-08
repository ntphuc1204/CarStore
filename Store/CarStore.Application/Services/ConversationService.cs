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
    public class ConversationService : IConversationService
    {
        private readonly IConversationRepository _repo;
        private readonly IMapper _mapper;

        public ConversationService(IConversationRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<Conversation> GetOrCreateConversationAsync(string user1Id, string user2Id)
        {
            var conversation = await _repo.GetByUsersAsync(user1Id, user2Id);
            if (conversation != null) return conversation;

            var dto = new CreateConversationDto { User1Id = user1Id, User2Id = user2Id };
            var newConv = _mapper.Map<Conversation>(dto);
            return await _repo.CreateAsync(newConv);
        }

        public async Task<List<Conversation>> GetUserConversationsAsync(string userId)
        {
            return await _repo.GetUserConversationsAsync(userId);
        }
    }
}
