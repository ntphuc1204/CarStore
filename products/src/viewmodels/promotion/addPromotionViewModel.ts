// === 📁 src/viewmodels/useAddPromotionViewModel.ts ===
import { useEffect, useState } from "react";
import { getAllCategorys, type Category } from "../../services/categoryService";
import { getByIdCategory, type Product } from "../../services/productService";
import { PromotionAdd } from "../../services/promotionService";
import { toast } from "react-toastify";

export function useAddPromotionViewModel(onSuccess: () => void, onClose: () => void) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    categoryID: 0,
    productId: 0,
    quantity: 0,
    discountPercent: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (formData.categoryID) {
      getByIdCategory(formData.categoryID).then(setProducts);
    }
  }, [formData.categoryID]);

  useEffect(() => {
    getAllCategorys()
      .then(setCategorys)
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { categoryID, ...submitData } = formData;
      await PromotionAdd(submitData);
      toast.success("Thêm sản phẩm thành công!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  };

  return {
    formData,
    categorys,
    products,
    handleChange,
    handleSubmit,
    setFormData,
  };
}
