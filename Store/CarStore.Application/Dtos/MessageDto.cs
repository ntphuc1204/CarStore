using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string SenderId { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }
    }
    public class CreateConversationDto
    {
        public string User1Id { get; set; } = null!;
        public string User2Id { get; set; } = null!;
    }
    public class SendMessageRequest
    {
        public string ReceiverId { get; set; } = null!;
        public string Content { get; set; } = null!;
    }
    public class MessageByUserDto
    {
        public int Id { get; set; }
        public string SenderId { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }
        public string UserId { get; set; }
    }
}
