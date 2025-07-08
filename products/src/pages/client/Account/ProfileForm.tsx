import { useState, useEffect } from "react";
import { getByUser, upDateByUser } from "../../../services/userService";

export default function ProfileForm({
  onSuccess,
}: {
  onSuccess: (msg: string) => void;
}) {
  const [formInfo, setFormInfo] = useState({
    id: "",
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await getByUser();
        setFormInfo(data);
      } catch {
        setError("Không thể tải thông tin người dùng.");
      }
    };
    loadUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await upDateByUser(formInfo.id, formInfo);
      onSuccess("Cập nhật thông tin thành công!");
    } catch {
      setError("Lỗi khi cập nhật thông tin.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Tên người dùng</label>
        <input
          type="text"
          name="userName"
          className="form-control"
          value={formInfo.userName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formInfo.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Số điện thoại</label>
        <input
          type="text"
          name="phoneNumber"
          className="form-control"
          value={formInfo.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Địa chỉ</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={formInfo.address}
          onChange={handleChange}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">
        Cập nhật thông tin
      </button>
    </form>
  );
}
