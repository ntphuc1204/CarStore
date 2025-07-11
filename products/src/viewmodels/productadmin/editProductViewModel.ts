import { useEffect, useState } from "react";
import { uploadImage } from "../../services/fileService";
import { getAllCategorys, type Category } from "../../services/categoryService";
import { updateProduct, type Product } from "../../services/productService";
import { toast } from "react-toastify";

export function useEditProductViewModel(
  product: Product | null,
  onClose: () => void,
  onUpdated: () => void
) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [categorys, setCategorys] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    id: product?.id || 0,
    name: product?.name || "",
    categoryID: product?.categoryID || 0,
    quantity: product?.quantity || 0,
    price: product?.price || 0,
    newImage: product?.img || "",
  });

  useEffect(() => {
    if (product?.img) {
      setImagePreview(`https://localhost:7204/uploads/${product.img}`);
    }

    getAllCategorys()
      .then(setCategorys)
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Ép kiểu dữ liệu nếu là các field số
    const parsedValue =
      name === "categoryID" || name === "quantity" || name === "price"
        ? Number(value)
        : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async () => {
    if (!product?.id) {
      console.error("ID không hợp lệ");
      return;
    }

    try {
      let imageUrl = formData.newImage;

      if (selectedImageFile) {
        imageUrl = await uploadImage(selectedImageFile);
      }

      const updatedProduct = {
        ...formData,
        newImage: imageUrl,
      };

      await updateProduct(product.id, updatedProduct);
      toast.success("Sửa sản phẩm thành công!");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Sửa sản phẩm thất bại!");
    }
  };

  return {
    formData,
    categorys,
    imagePreview,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
}
