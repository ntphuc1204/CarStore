import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { addMes, getMesById, type MesDto } from "../../services/messageService";
import { useNavigate } from "react-router-dom";

export default function MessageModal() {
  const [messages, setMessages] = useState<MesDto[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [newMsg, setNewMsg] = useState({
    receiverId: "1b85b683-3c11-4649-bb4d-89a85c31fc9d",
    content: "",
  });
  const shouldScrollRef = useRef(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    const trigger = document.getElementById("openChatModal");
    const modalEl = document.getElementById("chatModal");

    if (!trigger || !modalEl) return;

    const handleClick = () => {
      if (!token) {
        navigate("/login");
        return;
      }

      const modal = new Modal(modalEl);
      modal.show();
      shouldScrollRef.current = true;

      setTimeout(() => {
        scrollToBottom();
      }, 200);
    };

    trigger.addEventListener("click", handleClick);

    return () => {
      trigger.removeEventListener("click", handleClick);
    };
  }, [navigate, token]);

  const scrollToBottom = () => {
    const el = chatBodyRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  };
  useEffect(() => {
    // Chỉ scroll nếu cờ được bật
    if (shouldScrollRef.current) {
      const timeout = setTimeout(() => {
        scrollToBottom();
        shouldScrollRef.current = false; // reset cờ
      }, 100);

      return () => clearTimeout(timeout); // cleanup
    }
  }, [messages]);

  const userId = localStorage.getItem("userId") || "";
  const handleSend = async () => {
    if (!newMsg.content.trim()) return;
    await addMes(newMsg);
    setNewMsg({ ...newMsg, content: "" });
    const data = await getMesById(userId);
    setMessages(data || []);
    shouldScrollRef.current = true;
  };

  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getMesById(userId);
        setMessages(data || []);
        shouldScrollRef.current = true;
      } catch (err) {
        console.error("Lỗi khi tải tin nhắn:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <>
      <button
        id="openChatModal"
        className="btn btn-primary rounded-circle position-fixed mt-5"
        style={{ bottom: "20px", right: "20px", width: "56px", height: "56px" }}
      >
        <i className="bi bi-chat-fill"></i>
      </button>

      <div
        className="modal fade"
        id="chatModal"
        tabIndex={-1}
        aria-labelledby="chatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ height: "500px" }}>
            <div className="modal-header">
              <h5 className="modal-title">Trò chuyện</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div
              className="modal-body overflow-auto"
              ref={chatBodyRef}
              style={{ flex: "1 1 auto", maxHeight: "350px" }}
            >
              <div className="d-flex flex-column gap-1">
                {messages.length === 0 ? (
                  <div className="text-center text-muted">
                    Chưa có tin nhắn nào
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`d-flex ${
                        userId === msg.senderId
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded ${
                          userId === msg.senderId
                            ? "bg-primary text-white"
                            : "bg-light"
                        }`}
                        style={{
                          maxWidth: "75%",
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="d-flex align-items-center gap-1 p-3">
              <textarea
                className="form-control me-2"
                placeholder="Nhập tin nhắn..."
                value={newMsg.content}
                name="content"
                onChange={(e) =>
                  setNewMsg({ ...newMsg, content: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                style={{
                  resize: "none",
                  overflow: "hidden",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              />

              <button className="btn btn-primary" onClick={handleSend}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
