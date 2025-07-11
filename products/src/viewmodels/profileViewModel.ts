// viewmodels/user/useProfileViewModel.ts
import { useEffect, useState } from "react";
import { getByUser, upDateByUser } from "../services/userService";

export function useProfileViewModel(onSuccess: (msg: string) => void) {
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

  return {
    formInfo,
    error,
    handleChange,
    handleSubmit,
  };
}
