import { useEffect, useRef, useState } from "react";
import {
  addMes,
  getConversation,
  getMesAdmin,
  type GetListUserMes,
  type MesDto,
} from "../../services/messageService";
import { getByIdUser } from "../../services/userService";

export function useAdminMessageViewModel() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<GetListUserMes[]>([]);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [newMsg, setNewMsg] = useState({
    receiverId: "",
    content: "",
  });
  const [messages, setMessages] = useState<MesDto[]>([]);
  const adminId = localStorage.getItem("userId") || "";
  const shouldScrollRef = useRef(false);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = async (convId: number) => {
    const selectedConv = user.find((u) => u.id === convId);
    if (!selectedConv) return;
    setNewMsg((prev) => ({ ...prev, receiverId: selectedConv.user1Id }));
    setActiveConvId(convId);
    shouldScrollRef.current = true;
    await fetchMessages(convId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveConvId(null);
  };

  const fetchMessages = async (id: number) => {
    const data = await getConversation(id);
    setMessages(data);
  };

  const fetchUserNames = async (data: GetListUserMes[]) => {
    const nameMap: Record<string, string> = {};
    for (const conv of data) {
      const user = await getByIdUser(conv.user1Id);
      nameMap[conv.user1Id] = user.userName;
    }
    setUserNames(nameMap);
  };

  const handleSend = async () => {
    if (!newMsg.content.trim() || !newMsg.receiverId) return;
    await addMes(newMsg);
    setNewMsg((prev) => ({ ...prev, content: "" }));
    shouldScrollRef.current = true;

    const conv = user.find((u) => u.user1Id === newMsg.receiverId);
    if (conv) await fetchMessages(conv.id);

    const updatedUserList = await getMesAdmin();
    setUser(updatedUserList);
    fetchUserNames(updatedUserList);
  };

  useEffect(() => {
    (async () => {
      const data = await getMesAdmin();
      setUser(data);
      fetchUserNames(data);
    })();
  }, [activeConvId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!open || activeConvId === null) return;
      shouldScrollRef.current = true;
      await fetchMessages(activeConvId);
    }, 5000);

    return () => clearInterval(interval);
  }, [open, activeConvId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedUserList = await getMesAdmin();
      setUser(updatedUserList);
      fetchUserNames(updatedUserList);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (shouldScrollRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      shouldScrollRef.current = false;
    }
  }, [messages]);

  return {
    open,
    handleOpen,
    handleClose,
    user,
    userNames,
    newMsg,
    setNewMsg,
    messages,
    handleSend,
    adminId,
    messagesEndRef,
  };
}
