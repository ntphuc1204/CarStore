import axiosInstance from "./axiosInstance";

export interface UserUpdate {
  id: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  roles: string[];
}
export const getByUser = async () => {
  const res = await axiosInstance.get(`/User/me`);
  return res.data;
};
export const upDateByUser = async (id: string, User: UserUpdate) => {
  const res = await axiosInstance.put(`/User/${id}`, User);
  return res.data;
};
export const getByIdUser = async (id: string) => {
  const res = await axiosInstance.get(`/User/${id}`);
  return res.data;
};
export const changePassword = async (data: ChangePasswordDto) => {
  const res = await axiosInstance.post("/User/change-password", data);
  return res.data;
};
export const getAllUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get("/User");
  return res.data;
};
