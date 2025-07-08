import axios from "./axiosInstance";
import type { Product } from "./productService";

export interface BookingRequest {
  productId: number;
  quantity: number;
  total: number;
  bookingDate?: string;
  note?: string;
  status: number;
  promotionId: number;
}
export interface BookingDto {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  quantity: number;
  total: number;
  bookingDate: string;
  product: Product;
  status: number;
}

export const createBooking = async (
  data: BookingRequest,
  token: string
): Promise<void> => {
  await axios.post("/Booking", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export interface DashboardStats {
  totalBookings: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  totalRevenue: number;
}
export const getAllBooking = async (): Promise<BookingDto[]> => {
  const res = await axios.get("/Booking");
  return res.data;
};
export const getBookingByUser = async (): Promise<BookingDto[]> => {
  const res = await axios.get("/Booking/my");
  return res.data;
};
export const confirmBooking = async (id: number) => {
  const res = await axios.put(`/Booking/confirm/${id}`);
  return res.data;
};
export const cancelledBooking = async (id: number) => {
  const res = await axios.put(`/Booking/cancelled/${id}`);
  return res.data;
};
export const searchBookings = async (keyword: string) => {
  const res = await axios.get(`/Booking/search?keyword=${keyword}`);
  return res.data;
};
export const getDashboardStats = async () => {
  const res = await axios.get(`/Booking/statistics`);
  return res.data;
};
export const shipdBooking = async (id: number) => {
  const res = await axios.put(`/Booking/ship/${id}`);
  return res.data;
};
