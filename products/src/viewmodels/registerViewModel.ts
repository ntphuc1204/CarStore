// viewmodels/auth/useRegisterViewModel.ts
import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function useRegisterViewModel() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (err) {
      alert("Đăng ký thất bại!");
      console.error("Đăng ký lỗi:", err);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
}
