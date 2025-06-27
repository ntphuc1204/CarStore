import { useState } from "react";
import Header from "../../../components/client/Header";
import Footer from "../../../components/client/Footer";
import { register } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register with:", form);

    if (form != null) {
      register(form);
      alert("Dang ki thanh cong");
      navigate("/login");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="container mb-5" style={{ maxWidth: "480px" }}>
        <div className="auth-container">
          <h2 className="auth-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email address</label>
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
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                className="form-control"
                required
                value={form.userName}
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
            <button type="submit" className="btn btn-success w-100  auth-btn">
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
