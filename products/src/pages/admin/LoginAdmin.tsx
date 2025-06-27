import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "../../LoginForm.css";

export default function LoginAdmin() {
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
      const { accessToken, refreshToken, role } = res.data;

      // Lưu token và role vào localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

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

  return (
    <div
      className="container"
      style={{ maxWidth: "420px", marginTop: "200px" }}
    >
      <div className="auth-container">
        <h2 className="auth-title">Login Admin</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 auth-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
