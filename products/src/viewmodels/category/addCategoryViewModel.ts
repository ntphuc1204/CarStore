import { useState } from "react";
import { toast } from "react-toastify";
import { createCategory, type CreateCategory } from "../../services/categoryService";
import { uploadImage } from "../../services/fileService";


export function useAddCategoryViewModel(onClose: () => void, onSuccess: () => void) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: "", brand: "" });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let uploadedImage = "";
      if (imageFile) {
        uploadedImage = await uploadImage(imageFile);
      }

      const payload: CreateCategory = {
        ...formData,
        logo: uploadedImage,
      };

      await createCategory(payload);
      toast.success("Thêm danh mục thành công!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Lỗi khi thêm danh mục:", err);
      toast.error("Thêm danh mục thất bại!");
    }
  };

  return {
    formData,
    imagePreview,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
}
