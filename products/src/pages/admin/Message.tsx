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
import { useAdminMessageViewModel } from "../../viewmodels/message/messageAdminViewModel";

export default function Message() {
  const {
    open,
    user,
    userNames,
    newMsg,
    setNewMsg,
    messages,
    handleOpen,
    handleClose,
    handleSend,
    adminId,
    messagesEndRef,
  } = useAdminMessageViewModel();

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
                }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack direction="row" justifyContent="space-between">
                      <Typography fontWeight={600}>
                        {userNames[conv.user1Id] ?? "Đang tải..."}
                      </Typography>
                      <Typography fontSize="0.8rem" color="text.secondary">
                        {new Date(conv.lastMessageTime).toLocaleString("vi-VN")}
                      </Typography>
                    </Stack>
                  }
                  secondary={conv.messages?.[0]?.content ?? "Không có tin nhắn"}
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
                  backgroundColor: "#fff",
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

              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  placeholder="Nhập tin nhắn..."
                  size="small"
                  value={newMsg.content}
                  onChange={(e) =>
                    setNewMsg((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
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
