import { useState } from "react";
import { changePassword } from "../../../services/userService";
import axios from "axios";

export default function ChangePasswordForm({
  onSuccess,
}: {
  onSuccess: (msg: string) => void;
}) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmNewPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      await changePassword(form);
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      onSuccess("Đổi mật khẩu thành công!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const apiErr = err.response?.data?.errors;
        const msg =
          apiErr?.ConfirmNewPassword?.[0] ||
          err.response?.data?.title ||
          "Lỗi không xác định.";
        setError(msg);
      } else {
        setError("Lỗi không xác định.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Mật khẩu hiện tại</label>
        <input
          type="password"
          name="currentPassword"
          className="form-control"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Mật khẩu mới</label>
        <input
          type="password"
          name="newPassword"
          className="form-control"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirmNewPassword"
          className="form-control"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">
        Cập nhật mật khẩu
      </button>
    </form>
  );
}
