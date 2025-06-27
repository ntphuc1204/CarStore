import { useNavigate } from "react-router-dom";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import { useEffect, useState } from "react";
import { createBooking } from "../../services/bookingService";
import type { Product } from "../../services/productService";
import { getByUser, upDateByUser } from "../../services/userService";

export default function Booking() {
  interface TempBooking {
    product: Product;
    quantity: number;
  }
  const navigate = useNavigate();
  const [booking, setBooking] = useState<TempBooking>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const product = booking?.product;
  const quantity = booking?.quantity || 0;
  const total = product ? product.price * quantity : 0;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getByUser()
        .then((user) => {
          setName(user.userName);
          setEmail(user.email);
          setPhone(user.phoneNumber || "");
          setAddress(user.address || "");

          localStorage.setItem("userId", user.id); // Lưu lại để cập nhật sau
        })
        .catch((err) => {
          console.error("Lỗi khi lấy thông tin user:", err);
        });
    }

    const stored = localStorage.getItem("booking");
    if (stored) {
      setBooking(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!name || !email || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      if (!booking) {
        alert("Không có thông tin đặt hàng.");
        return;
      }

      const userId = localStorage.getItem("userId");
      if (userId) {
        await upDateByUser(userId, {
          id: userId,
          userName: name,
          email,
          phoneNumber: phone,
          address,
        });
        console.log("userId:", userId);
        console.log("Payload gửi update:", {
          userName: name,
          email,
          phoneNumber: phone,
          address,
        });
      }

      await createBooking(
        {
          productId: booking.product.id,
          quantity: booking.quantity,
          total: total,
          bookingDate: new Date().toISOString(),
          note: "",
          status: 0,
        },
        token
      );

      alert("Đặt hàng thành công!");
      localStorage.removeItem("booking");
      navigate("/");
    } catch (error) {
      console.error("Đặt hàng thất bại:", error);

      alert("Đã xảy ra lỗi khi đặt hàng.");
    }
  };

  return (
    <>
      <Header />
      <div className="booking">
        <div className="container pt-5 pb-5">
          <h2 className="text-center mb-4">BOOKING</h2>
          <nav className="mb-4">
            <a href="#">HOME</a>/ <span className="text-muted">BOOKING</span>
          </nav>

          <div className="row">
            <div className="col-md-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="section-title mb-3">BILLING DETAILS</div>
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
                    PLACE ORDER
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="section-title mb-3">INVOICE</div>
                <table className="table summary-table">
                  <tbody>
                    <tr>
                      <th>PRODUCT</th>
                      <th className="text-end">Amount</th>
                    </tr>
                    <tr>
                      <td>{product?.name}</td>
                      <td className="text-end">
                        ${product?.price.toLocaleString("de-DE")}
                      </td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td className="text-end">{product?.categoryName}</td>
                    </tr>
                    <tr>
                      <td>Quantity</td>
                      <td className="text-end">{quantity}</td>
                    </tr>
                    <tr>
                      <td>VAT</td>
                      <td className="text-end">0</td>
                    </tr>
                    <tr>
                      <th className="text-danger">Total</th>
                      <th className="text-end text-danger">
                        ${total.toLocaleString("de-DE")}
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
