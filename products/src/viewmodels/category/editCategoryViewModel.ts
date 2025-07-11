import { useEffect, useState } from "react";
import { type Category, updateCategory } from "../../services/categoryService";
import { uploadImage } from "../../services/fileService";
import { toast } from "react-toastify";

export function useEditCategoryViewModel(
  category: Category | null,
  onClose: () => void,
  onUpdated: () => void
) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    id: category?.id || 0,
    name: category?.name || "",
    brand: category?.brand || "",
    newLogo: category?.logo || "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        brand: category.brand,
        newLogo: category.logo,
      });
      setImagePreview(`https://localhost:7204/uploads/${category.logo}`);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.id) {
      toast.error("ID không hợp lệ");
      return;
    }

    try {
      let uploadedImage = formData.newLogo;

      if (selectedImageFile) {
        uploadedImage = await uploadImage(selectedImageFile);
      }

      const updatedData = {
        ...formData,
        newLogo: uploadedImage,
      };

      await updateCategory(formData.id, updatedData);
      toast.success("Cập nhật danh mục thành công!");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      toast.error("Cập nhật thất bại!");
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
