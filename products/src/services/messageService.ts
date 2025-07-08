import axiosInstance from "./axiosInstance";

export interface MesDto {
  id: number;
  senderId: string;
  content: string;
  sentAt: string;
  userId: string;
}
export interface AddMesDto {
  receiverId: string;
  content: string;
}
export interface GetListUserMes {
  id: number;
  user1Id: string;
  user2Id: string;
  lastMessageTime: string;
  messages: {
    id: number;
    senderId: string;
    content: string;
    sentAt: string;
    isRead: boolean;
  }[];
}
export const getMesById = async (id: string) => {
  const res = await axiosInstance.get(`/Messages/userId/${id}`);
  return res.data;
};
export const addMes = async (add: AddMesDto) => {
  const res = await axiosInstance.post(`/Messages`, add);
  return res.data;
};
export const getMesAdmin = async () => {
  const res = await axiosInstance.get(`/Messages/conversations`);
  return res.data;
};
export const getConversation = async (id: number) => {
  const res = await axiosInstance.get(`/Messages/${id}`);
  return res.data;
};
