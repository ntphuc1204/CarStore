// viewmodels/product/useProductDetailViewModel.ts
import { useEffect, useRef, useState } from "react";
import { getById, type Product } from "../../services/productService";
import { getByProductId, type PromotionDto } from "../../services/promotionService";
import { useNavigate, useParams } from "react-router-dom";

export function useProductDetailViewModel() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [promotions, setPromotions] = useState<PromotionDto[]>([]);
  const [selectedPromotionId, setSelectedPromotionId] = useState<number | null>(null);
  const token = useRef(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getById(Number(id));
        const dataPromotion = await getByProductId(Number(id));
        setPromotions(dataPromotion);
        setProductDetail(data);
      }
    })();
  }, [id]);

  const handleQuantityChange = (value: string) => {
    setQuantity(parseInt(value));
  };

  const handlePromotionChange = (value: string) => {
    setSelectedPromotionId(value ? Number(value) : null);
  };

  const handleSubmit = () => {
    if (!token.current) {
      navigate("/login");
      return;
    }

    localStorage.setItem(
      "booking",
      JSON.stringify({
        product: productDetail,
        quantity,
        promotion: selectedPromotionId,
      })
    );
    navigate("/booking");
  };

  return {
    productDetail,
    quantity,
    promotions,
    selectedPromotionId,
    handleQuantityChange,
    handlePromotionChange,
    handleSubmit,
  };
}
