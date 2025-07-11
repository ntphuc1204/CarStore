import Header from "../../../components/client/Header";
import Footer from "../../../components/client/Footer";
import { useRegisterViewModel } from "../../../viewmodels/registerViewModel";

export default function Register() {
  const { form, handleChange, handleSubmit } = useRegisterViewModel();

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
