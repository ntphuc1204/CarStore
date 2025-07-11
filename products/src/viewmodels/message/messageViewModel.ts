// 📁 src/viewmodels/message/useMessageModalViewModel.ts
import { useEffect, useRef, useState } from "react";
import { addMes, getMesById, type MesDto } from "../../services/messageService";
import { useNavigate } from "react-router-dom";

export function useMessageModalViewModel() {
  const [messages, setMessages] = useState<MesDto[]>([]);
  const [newMsg, setNewMsg] = useState({
    receiverId: "4d87909d-c5f9-4b74-87fb-5f5f26bef270",
    content: "",
  });
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";
  const userId = localStorage.getItem("userId") || "";

  const scrollToBottom = () => {
    const el = chatBodyRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  };

  const fetchMessages = async () => {
    if (!userId) return;
    const data = await getMesById(userId);
    setMessages(data || []);
    shouldScrollRef.current = true;
  };

  const handleSend = async () => {
    if (!newMsg.content.trim()) return;
    await addMes(newMsg);
    setNewMsg({ ...newMsg, content: "" });
    await fetchMessages();
  };

  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  return {
    messages,
    newMsg,
    setNewMsg,
    chatBodyRef,
    shouldScrollRef,
    scrollToBottom,
    fetchMessages,
    handleSend,
    token,
    userId,
    navigate,
  };
}
