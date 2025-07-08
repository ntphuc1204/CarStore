import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import Sidenav from "../../components/admin/Sidenav";
import Navbar from "../../components/admin/Navbar";
import {
  addMes,
  getConversation,
  getMesAdmin,
  type GetListUserMes,
  type MesDto,
} from "../../services/messageService";
import { getByIdUser } from "../../services/userService";

export default function Message() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<GetListUserMes[]>([]);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [newMsg, setNewMsg] = useState({
    receiverId: "",
    content: "",
  });
  const [messages, setMessages] = useState<MesDto[]>([]);
  const adminId = localStorage.getItem("userId");
  const shouldScrollRef = useRef(false);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);

  const handleOpen = (convId: number) => {
    const selectedConv = user.find((u) => u.id === convId);
    if (!selectedConv) return;

    setNewMsg((prev) => ({
      ...prev,
      receiverId: selectedConv.user1Id,
    }));

    setActiveConvId(convId);
    shouldScrollRef.current = true;
    fetchMes(convId);
    setOpen(true);
  };

  const fetchMes = async (id: number) => {
    const data = await getConversation(id);
    setMessages(data);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveConvId(null);
  };

  // Lấy danh sách user + tên user
  const fetchUserNames = async (data: GetListUserMes[]) => {
    const nameMap: Record<string, string> = {};
    for (const conv of data) {
      const user = await getByIdUser(conv.user1Id);
      nameMap[conv.user1Id] = user.userName;
    }
    setUserNames(nameMap);
  };

  useEffect(() => {
    (async () => {
      const data = await getMesAdmin();
      setUser(data);
      fetchUserNames(data);
    })();
  }, [activeConvId]);

  //Mỗi 5s update tin nhắn mới nhất
  useEffect(() => {
    if (!open || activeConvId === null) return;

    const interval = setInterval(async () => {
      shouldScrollRef.current = true;
      await fetchMes(activeConvId);
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

  //Auto scroll xuống tin nhắn mới nhất
  useEffect(() => {
    if (shouldScrollRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      shouldScrollRef.current = false;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.content.trim() || !newMsg.receiverId) return;

    await addMes(newMsg);
    setNewMsg((prev) => ({ ...prev, content: "" }));
    shouldScrollRef.current = true;
    const conv = user.find((u) => u.user1Id === newMsg.receiverId);
    if (conv) await fetchMes(conv.id);
    const updatedUserList = await getMesAdmin();
    setUser(updatedUserList);
    fetchUserNames(updatedUserList);
  };

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={60}></Box>
      <Box sx={{ display: "flex", padding: 1 }}>
        <Sidenav />
        <Box sx={{ p: 2, width: "100%" }}>
          <List>
            {user.map((conv) => (
              <ListItemButton
                key={conv.id}
                onClick={() => handleOpen(conv.id)}
                sx={{
                  mb: 2,
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={600}>
                        {userNames[conv.user1Id] ?? "Đang tải..."}
                      </Typography>
                      <Typography fontSize="0.8rem" color="text.secondary">
                        {new Date(conv.lastMessageTime).toLocaleString(
                          "vi-VN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    conv.messages && conv.messages.length > 0
                      ? conv.messages[0].content
                      : "Không có tin nhắn"
                  }
                />
              </ListItemButton>
            ))}
          </List>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
              Tin nhắn với {userNames[newMsg.receiverId] ?? "Người dùng"}
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  maxHeight: 400,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: 1,
                  mb: 2,
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                }}
              >
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      alignSelf:
                        msg.senderId === adminId ? "flex-end" : "flex-start",
                      backgroundColor:
                        msg.senderId === adminId ? "#2979ff" : "#f1f1f1",
                      color: msg.senderId === adminId ? "white" : "black",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      maxWidth: "70%",
                      wordBreak: "break-word",
                    }}
                  >
                    <Typography>{msg.content}</Typography>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Nhập tin nhắn */}
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  placeholder="Nhập tin nhắn..."
                  size="small"
                  value={newMsg.content}
                  onChange={(e) =>
                    setNewMsg((prev) => ({ ...prev, content: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button variant="contained" onClick={handleSend}>
                  Gửi
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
}
