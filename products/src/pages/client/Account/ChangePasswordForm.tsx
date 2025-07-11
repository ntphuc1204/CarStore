import { useChangePasswordViewModel } from "../../../viewmodels/changePasswordViewModel";

export default function ChangePasswordForm({
  onSuccess,
}: {
  onSuccess: (msg: string) => void;
}) {
  const { form, error, handleChange, handleSubmit } =
    useChangePasswordViewModel(onSuccess);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Mật khẩu hiện tại</label>
        <input
          type="password"
          name="currentPassword"
          className="form-control"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Mật khẩu mới</label>
        <input
          type="password"
          name="newPassword"
          className="form-control"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirmNewPassword"
          className="form-control"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">
        Cập nhật mật khẩu
      </button>
    </form>
  );
}
