
import Header from "../../../components/client/Header";
import Footer from "../../../components/client/Footer";
import "../../../LoginForm.css";
import { useLoginViewModel } from "../../../viewmodels/login/loginViewModel";

export default function Login() {
  const { form, error, handleChange, handleSubmit } = useLoginViewModel();

  return (
    <>
      <Header />
      <div className="container mb-5" style={{ maxWidth: "480px" }}>
        <div className="auth-container">
          <h2 className="auth-title">Login</h2>
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
          <p className="auth-link">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
