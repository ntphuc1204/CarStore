import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export function useLoginAdminViewModel() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const { accessToken, refreshToken, role, userId } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      if (role === "Admin") {
        alert("Đăng nhập admin thành công");
        navigate("/admin/Home");
      } else {
        setError("Bạn không có quyền truy cập trang Admin.");
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: string } };
        setError(axiosError.response?.data || "Đăng nhập thất bại.");
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
