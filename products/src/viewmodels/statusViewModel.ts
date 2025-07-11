// src/viewmodels/statusViewModel.ts
import { useEffect, useState } from "react";
import {
  cancelledBooking,
  getBookingByUser,
  shipdBooking,
  type BookingDto,
} from "../services/bookingService";
import { toast } from "react-toastify";

export function useStatusViewModel() {
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const [statusChanged, setStatusChanged] = useState<number>(0);
  const [selectedBooking, setSelectedBooking] = useState<BookingDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBookings = async () => {
    try {
      const data = await getBookingByUser();
      setBookings(data);
    } catch (error) {
      console.error("Lỗi lấy đơn hàng:", error);
    }
  };

  const handleCancelled = async (id: number) => {
    try {
      await cancelledBooking(id);
      toast.success("Xác nhận đã hủy đơn!");
      setStatusChanged(id);
    } catch (error) {
      console.error("Lỗi khi hủy:", error);
    }
  };

  const handleShipped = async (id: number) => {
    try {
      await shipdBooking(id);
      toast.success("Xác nhận giao hàng thành công!");
      setStatusChanged(id);
    } catch (error) {
      console.error("Lỗi khi xác nhận giao:", error);
    }
  };

  const handleShowDetail = (booking: BookingDto) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [statusChanged]);

  return {
    bookings,
    selectedBooking,
    showModal,
    handleCancelled,
    handleShipped,
    handleShowDetail,
    handleCloseModal,
  };
}
