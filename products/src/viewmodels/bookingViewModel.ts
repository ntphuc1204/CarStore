// src/viewmodels/booking/useBookingViewModel.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { getByUser, upDateByUser } from "../services/userService";
import { getByPromotionId, type PromotionDto } from "../services/promotionService";
import { type Product } from "../services/productService";

interface TempBooking {
  product: Product;
  quantity: number;
  promotion: number;
}

export function useBookingViewModel() {
  const [booking, setBooking] = useState<TempBooking>();
  const [discountPercent, setDiscountPercent] = useState<PromotionDto>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const product = booking?.product;
  const quantity = booking?.quantity || 0;
  const idPromo = booking?.promotion || 0;
  const total = product ? product.price * quantity : 0;
  const disPromo = discountPercent?.discountPercent || 0;
  const totalByPromo = total - (total * disPromo) / 100;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getByUser()
        .then((user) => {
          setName(user.userName);
          setEmail(user.email);
          setPhone(user.phoneNumber || "");
          setAddress(user.address || "");
        })
        .catch(() => console.error("Không lấy được user"));
    }

    const stored = localStorage.getItem("booking");
    if (stored) {
      setBooking(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!idPromo || idPromo <= 0) {
      setDiscountPercent(undefined);
      return;
    }

    (async () => {
      try {
        const data = await getByPromotionId(idPromo);
        setDiscountPercent(data);
      } catch {
        setDiscountPercent(undefined);
      }
    })();
  }, [idPromo]);

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

    if (!booking) {
      alert("Không có thông tin đặt hàng.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await upDateByUser(userId, {
          id: userId,
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
          promotionId: booking.promotion,
        },
        token
      );

      alert("Đặt hàng thành công!");
      localStorage.removeItem("booking");
      navigate("/");
    } catch (error) {
      alert("Đã xảy ra lỗi khi đặt hàng.");
    }
  };

  return {
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
  };
}
