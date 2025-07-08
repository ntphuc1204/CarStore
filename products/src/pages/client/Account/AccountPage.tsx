import { useState } from "react";
import Header from "../../../components/client/Header";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import Footer from "../../../components/client/Footer";

export default function AccountPage() {
  const [tab, setTab] = useState<"profile" | "password">("profile");
  const [message, setMessage] = useState("");

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="border rounded p-3 shadow-sm">
              <h5 className="mb-3">Tài khoản</h5>
              <ul className="list-group">
                <li
                  className={`list-group-item ${
                    tab === "profile" ? "active" : ""
                  }`}
                  onClick={() => setTab("profile")}
                  style={{ cursor: "pointer" }}
                >
                  Thông tin cá nhân
                </li>
                <li
                  className={`list-group-item ${
                    tab === "password" ? "active" : ""
                  }`}
                  onClick={() => setTab("password")}
                  style={{ cursor: "pointer" }}
                >
                  Đổi mật khẩu
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-8">
            <div className="border rounded p-4 shadow-sm">
              <h4 className="text-center mb-4">
                {tab === "profile" ? "Thông tin cá nhân" : "Đổi mật khẩu"}
              </h4>
              {message && <div className="alert alert-success">{message}</div>}
              {tab === "profile" ? (
                <ProfileForm onSuccess={(msg) => setMessage(msg)} />
              ) : (
                <ChangePasswordForm onSuccess={(msg) => setMessage(msg)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
