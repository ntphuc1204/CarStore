using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IConversationService _conversationService;
        private readonly IMessageService _messageService;
        private readonly IHttpContextAccessor _http;

        public MessagesController(
            IConversationService conversationService,
            IMessageService messageService,
            IHttpContextAccessor http)
        {
            _conversationService = conversationService;
            _messageService = messageService;
            _http = http;
        }

        private string GetUserId() =>
            _http.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new UnauthorizedAccessException();

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
        {
            var senderId = GetUserId();
            var conversation = await _conversationService.GetOrCreateConversationAsync(senderId, request.ReceiverId);
            var message = await _messageService.SendMessageAsync(conversation.Id, senderId, request.Content);
            return Ok(message);
        }

        [HttpGet("{conversationId}")]
        public async Task<IActionResult> GetMessages(int conversationId)
        {
            var messages = await _messageService.GetMessagesAsync(conversationId);
            return Ok(messages);
        }

        [HttpGet("conversations")]
        public async Task<IActionResult> GetUserConversations()
        {
            var userId = GetUserId();
            var conversations = await _conversationService.GetUserConversationsAsync(userId);
            return Ok(conversations);
        }
        [HttpGet("userId/{id}")]
        public async Task<IActionResult> GetByUserId(string id)
        {
            var reuslt = await _messageService.GetByIdUser(id);
            return Ok(reuslt);
        }
    }
}
