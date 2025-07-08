import { useEffect, useState } from "react";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import {
  cancelledBooking,
  getBookingByUser,
  shipdBooking,
  type BookingDto,
} from "../../services/bookingService";
import { toast } from "react-toastify";

export default function Status() {
  const [booking, setBooking] = useState<BookingDto[]>();
  const [status, setStaus] = useState(0);
  const fetchBoking = async () => {
    const data = await getBookingByUser();
    setBooking(data);
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDto | null>(
    null
  );
  const handleCancelled = async (id: number) => {
    try {
      await cancelledBooking(id);
      toast.success("Xác nhận đã hủy đơn!");
      setStaus(id);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  const handledShip = async (id: number) => {
    try {
      await shipdBooking(id);
      toast.success("Xác nhận giao hàng thành công!");
      setStaus(id);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  useEffect(() => {
    fetchBoking();
  }, [status]);
  const handleShowDetail = (booking: BookingDto) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };
  return (
    <>
      <Header></Header>
      <section className="container mt-5 mb-4">
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-3">Trạng thái đơn hàng</h3>
              {booking?.map((item) => (
                <div
                  className="booking-card d-flex align-items-start gap-4 border rounded mb-3"
                  data-status="0"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowDetail(item)}
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
                                Chờ xác nhận
                              </span>
                            );
                          case 1:
                            return (
                              <span className="badge bg-info">
                                Đã xác nhận đang giao hàng
                              </span>
                            );
                          case 3:
                            return (
                              <span className="badge bg-success">
                                Giao hàng thành công
                              </span>
                            );
                          case 2:
                            return (
                              <span className="badge bg-danger">Đã hủy</span>
                            );
                        }
                      })()}
                      {(() => {
                        switch (item.status) {
                          case 0:
                            return (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleCancelled(item.id)}
                              >
                                Hủy
                              </button>
                            );
                          case 1:
                            return (
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handledShip(item.id)}
                              >
                                Giao hàng thành công
                              </button>
                            );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {selectedBooking && (
        <div
          className={`modal fade show`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết đơn hàng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Email</th>
                      <td>{selectedBooking.email}</td>
                    </tr>
                    <tr>
                      <th>Khách hàng</th>
                      <td>{selectedBooking.userName}</td>
                    </tr>
                    <tr>
                      <th>SĐT</th>
                      <td>{selectedBooking.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>Tên xe</th>
                      <td>{selectedBooking.product.name}</td>
                    </tr>
                    <tr>
                      <th>Hãng xe</th>
                      <td>{selectedBooking.product.categoryName}</td>
                    </tr>
                    <tr>
                      <th>Địa chỉ</th>
                      <td>{selectedBooking.address}</td>
                    </tr>
                    <tr>
                      <th>Ngày đặt</th>
                      <td>
                        {new Date(selectedBooking.bookingDate).toLocaleString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Số lượng</th>
                      <td>{selectedBooking.quantity}</td>
                    </tr>
                    <tr>
                      <th>Tổng tiền</th>
                      <td>${selectedBooking.total.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer></Footer>
    </>
  );
}
