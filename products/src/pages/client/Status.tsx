import { useEffect, useState } from "react";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import {
  cancelledBooking,
  getBookingByUser,
  type BookingDto,
} from "../../services/bookingService";
import { toast } from "react-toastify";

export default function Status() {
  const [booking, setBooking] = useState<BookingDto[]>();
  const fetchBoking = async () => {
    const data = await getBookingByUser();
    setBooking(data);
  };
  const handleCancelled = async (id: number) => {
    try {
      await cancelledBooking(id);
      toast.success("Cancelled success!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  useEffect(() => {
    fetchBoking();
  }, [booking]);
  return (
    <>
      <Header></Header>
      <section className="container mt-5 mb-4">
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-3">Booking Status</h3>
              {booking?.map((item) => (
                <div
                  className="booking-card d-flex align-items-start gap-4"
                  data-status="0"
                >
                  <img
                    src={`https://localhost:7204/uploads/${item.product.img}`}
                    alt="Xe Vinfast"
                    className="rounded"
                    width="135"
                    height="85"
                  />
                  <div className="flex-grow-1">
                    <div className="title mb-1">{item.product.name}</div>
                    <div className="small text-muted mb-2">
                      <i className="bi bi-clock"></i>{" "}
                      {new Date(item.bookingDate).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {(() => {
                        switch (item.status) {
                          case 0:
                            return (
                              <span className="badge bg-warning">
                                Pending Confirmation
                              </span>
                            );
                          case 1:
                            return (
                              <span className="badge bg-success">
                                Confirmed
                              </span>
                            );
                          case 2:
                            return (
                              <span className="badge bg-danger">Confirmed</span>
                            );
                        }
                      })()}
                      {item.status === 0 ? (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleCancelled(item.id)}
                        >
                          Hủy
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
