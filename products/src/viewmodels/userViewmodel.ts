// viewmodels/useProductViewModel.ts
import { useEffect, useState } from "react";
import { getAllUsers, type User } from "../services/userService";

export function UserViewModel() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res))
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err))
  }, []);

  return {
    users,
  };
}
