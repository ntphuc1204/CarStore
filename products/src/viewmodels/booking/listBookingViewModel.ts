import { useEffect, useState } from "react";
import {
  getAllBooking,
  searchBookings,
  type BookingDto,
} from "../../services/bookingService";

export function useBookingListViewModel() {
  const [booking, setBooking] = useState<BookingDto[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingDto | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchBooking = async () => {
    const data = await getAllBooking();
    setBooking(data);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value.trim()) {
      const data = await getAllBooking();
      setBooking(data);
      return;
    }
    try {
      const result = await searchBookings(value);
      setBooking(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComfirm = async (booking: BookingDto) => {
    setSelectedBooking(booking);
    setEditModalOpen(true);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return {
    booking,
    selectedBooking,
    editModalOpen,
    searchText,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearch,
    handleComfirm,
    setEditModalOpen,
    fetchBooking,
  };
}