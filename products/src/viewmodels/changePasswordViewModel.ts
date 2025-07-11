// viewmodels/user/useChangePasswordViewModel.ts
import { useState } from "react";
import axios from "axios";
import { changePassword } from "../services/userService";

export function useChangePasswordViewModel(onSuccess: (msg: string) => void) {
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

  return {
    form,
    error,
    handleChange,
    handleSubmit,
  };
}
