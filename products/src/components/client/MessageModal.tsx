// 📁 src/components/chat/MessageModal.tsx
import { useEffect } from "react";
import { Modal } from "bootstrap";
import { useMessageModalViewModel } from "../../viewmodels/message/messageViewModel";

export default function MessageModal() {
  const {
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
  } = useMessageModalViewModel();

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

      setTimeout(() => scrollToBottom(), 200);
    };

    trigger.addEventListener("click", handleClick);
    return () => trigger.removeEventListener("click", handleClick);
  }, [navigate, token]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const timeout = setTimeout(() => {
        scrollToBottom();
        shouldScrollRef.current = false;
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

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
                  <div className="text-center text-muted">Chưa có tin nhắn nào</div>
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
