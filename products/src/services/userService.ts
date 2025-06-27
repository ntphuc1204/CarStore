import axiosInstance from "./axiosInstance";

export interface UserUpdate {
  id: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}
export const getByUser = async () => {
  const res = await axiosInstance.get(`/User/me`);
  return res.data;
};
export const upDateByUser = async (id: string, User: UserUpdate) => {
  const res = await axiosInstance.put(`/User/${id}`, User);
  return res.data;
};
