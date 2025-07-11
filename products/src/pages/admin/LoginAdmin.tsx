import "../../LoginForm.css";
import { useLoginAdminViewModel } from "../../viewmodels/login/loginAdminViewModel";

export default function LoginAdmin() {
  const { form, error, handleChange, handleSubmit } = useLoginAdminViewModel();

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
