using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Domain.Entities
{
    public class Conversation
    {
        public int Id { get; set; }
        public string User1Id { get; set; } = null!;
        public string User2Id { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime LastMessageTime { get; set; }
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }

}
