import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import type { Product } from "../../services/productService";
import { useBookingViewModel } from "../../viewmodels/bookingViewModel";

export default function Booking() {
  const {
    name,
    email,
    phone,
    address,
    setName,
    setEmail,
    setPhone,
    setAddress,
    product,
    quantity,
    discountPercent,
    totalByPromo,
    handleSubmit,
  } = useBookingViewModel();

  return (
    <>
      <Header />
      <div className="booking">
        <div className="container pt-5 pb-5">
          <h2 className="text-center mb-4">HÓA ĐƠN</h2>
          <nav className="mb-4">
            <a href="#">Trang chủ</a>/{" "}
            <span className="text-muted">Hóa đơn</span>
          </nav>

          <div className="row">
            <div className="col-md-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="section-title mb-3">Thông tin cá nhân</div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary w-100">
                    Đặt hàng
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="section-title mb-3">Chi tiết hóa đơn</div>
                <table className="table summary-table">
                  <tbody>
                    <tr>
                      <th>Sản phẩm</th>
                      <th className="text-end">Chỉ số</th>
                    </tr>
                    <tr>
                      <td>{product?.name}</td>
                      <td className="text-end">
                        ${product?.price.toLocaleString("de-DE")}
                      </td>
                    </tr>
                    <tr>
                      <td>Hãng xe</td>
                      <td className="text-end">{product?.categoryName}</td>
                    </tr>
                    <tr>
                      <td>Số lượng</td>
                      <td className="text-end">{quantity}</td>
                    </tr>
                    <tr>
                      <td>Khuyến mãi</td>
                      {discountPercent ? (
                        <td className="text-end">
                          {discountPercent.discountPercent}%
                        </td>
                      ) : (
                        <td className="text-end">0</td>
                      )}
                    </tr>
                    <tr>
                      <th className="text-danger">Tổng tiền</th>
                      <th className="text-end text-danger">
                        ${totalByPromo.toLocaleString("de-DE")}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
