import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { updateProduct, type Product } from "../../../services/productService";
import {
  getAllCategorys,
  type Category,
} from "../../../services/categoryService";
import { toast } from "react-toastify";
import { uploadImage } from "../../../services/fileService";

type Props = {
  product: Product | null;
  onClose: () => void;
  onUpdated: () => void;
};
export default function EditProduct({ product, onClose, onUpdated }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    id: product?.id || 0,
    name: product?.name || "",
    categoryID: product?.categoryID || 0,
    quantity: product?.quantity || 0,
    price: product?.price || 0,
    newImage: product?.img || "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  useEffect(() => {
    if (product?.img) {
      setImagePreview(`https://localhost:7204/uploads/${product.img}`);
    }
    getAllCategorys()
      .then(setCategorys)
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!product?.id) {
      console.error("ID không hợp lệ");
      return;
    }
    try {
      let imageUrl = formData.newImage;

      // Nếu người dùng chọn ảnh mới, upload ảnh
      if (selectedImageFile) {
        imageUrl = await uploadImage(selectedImageFile);
      }

      const updatedProduct = {
        ...formData,
        newImage: imageUrl, // gán URL ảnh đã upload vào
      };

      console.log("Dữ liệu gửi đi:", updatedProduct);

      await updateProduct(product?.id, updatedProduct);
      toast.success("Sửa sản phẩm thành công!");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <Typography variant="h5" align="center">
        Edit Products
      </Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }}>
        <CloseIcon />
      </IconButton>
      <Box height={30}></Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>

        <TextField
          label="Category"
          variant="outlined"
          size="small"
          select
          fullWidth
          name="categoryID"
          value={formData.categoryID}
          onChange={(e) =>
            setFormData({ ...formData, categoryID: Number(e.target.value) })
          }
        >
          {categorys.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <Grid size={{ xs: 6 }}>
          <TextField
            label="Quantity"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            label="Price"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Grid>
        {imagePreview && (
          <Grid size={{ xs: 12 }}>
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{
                maxHeight: 100,
                width: "100%",
                objectFit: "contain",
                border: "1px solid #ccc",
                borderRadius: 2,
                mt: 1,
              }}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
