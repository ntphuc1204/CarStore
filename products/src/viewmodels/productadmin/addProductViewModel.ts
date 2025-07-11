// src/viewmodels/product/useAddProductViewModel.ts
import { useEffect, useState } from "react";
import { getAllCategorys, type Category } from "../../services/categoryService";
import { uploadImage } from "../../services/fileService";
import { createProduct } from "../../services/productService";
import { type CreateProductDto } from "../../services/productService";
import { toast } from "react-toastify";

export function useAddProductViewModel(onClose: () => void, onSuccess: () => void) {
  const [formData, setFormData] = useState({
    name: "",
    categoryID: 0,
    quantity: 0,
    price: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categorys, setCategorys] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategorys()
      .then(setCategorys)
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      let uploadedImage = "";
      if (imageFile) {
        uploadedImage = await uploadImage(imageFile);
      }

      const payload: CreateProductDto = {
        ...formData,
        categoryID: Number(formData.categoryID),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        img: uploadedImage,
      };

      await createProduct(payload);
      toast.success("Thêm sản phẩm thành công!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  return {
    formData,
    imagePreview,
    categorys,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
}
