import { useProfileViewModel } from "../../../viewmodels/profileViewModel";

export default function ProfileForm({
  onSuccess,
}: {
  onSuccess: (msg: string) => void;
}) {
  const { formInfo, error, handleChange, handleSubmit } =
    useProfileViewModel(onSuccess);

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
