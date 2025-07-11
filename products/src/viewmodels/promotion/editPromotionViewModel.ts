// src/viewmodels/useEditPromotionViewModel.ts
import { useEffect, useState } from "react";
import {
  getById,
  getByIdCategory,
  type Product,
} from "../../services/productService";
import {
  getAllCategorys,
  type Category,
} from "../../services/categoryService";
import {
  updatePromotion,
  type PromotionDto,
} from "../../services/promotionService";

export function useEditPromotionViewModel(promotion: PromotionDto | null, onUpdated: () => void, onClose: () => void) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productDetail, setProductDetail] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    id: promotion?.id || 0,
    title: promotion?.title || "",
    categoryID: 0,
    productId: promotion?.productId || 0,
    quantity: promotion?.quantity || 0,
    discountPercent: promotion?.discountPercent || 0,
    startDate: promotion?.startDate ? formatDateForInput(promotion.startDate) : "",
    endDate: promotion?.endDate ? formatDateForInput(promotion.endDate) : "",
  });

  function formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const offsetMs = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offsetMs);
    return localDate.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (promotion?.productId) {
      getById(promotion.productId).then(setProductDetail);
    }
  }, [promotion]);

  useEffect(() => {
    if (productDetail) {
      setFormData((prev) => ({ ...prev, categoryID: productDetail.categoryID }));
    }
  }, [productDetail]);

  useEffect(() => {
    getAllCategorys().then(setCategories);
  }, []);

  useEffect(() => {
    if (formData.categoryID) {
      getByIdCategory(formData.categoryID).then(setProducts);
    }
  }, [formData.categoryID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!promotion?.id) return;
    const { categoryID, ...submitData } = formData;
    await updatePromotion(promotion.id, submitData);
    onUpdated();
    onClose();
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    categories,
    products,
  };
}
