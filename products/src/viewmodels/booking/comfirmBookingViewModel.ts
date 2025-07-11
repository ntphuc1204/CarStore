// viewmodels/booking/useConfirmBookingViewModel.ts
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { confirmBooking, type BookingDto } from "../../services/bookingService";

export function useConfirmBookingViewModel(
  booking: BookingDto | null,
  onClose: () => void,
  onUpdated: () => void
) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (booking?.product?.img) {
      setImagePreview(`https://localhost:7204/uploads/${booking.product.img}`);
    }
  }, [booking]);

  const handleSubmit = async () => {
    if (!booking?.id) {
      console.error("ID không hợp lệ");
      return;
    }
    try {
      await confirmBooking(booking.id);
      toast.success("Confirm success!");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const formattedDate = booking?.bookingDate
    ? format(new Date(booking.bookingDate), "dd-MM-yyyy")
    : "";

  return {
    imagePreview,
    handleSubmit,
    formattedDate,
  };
}
