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
import React, { useState, useEffect } from "react";
import {
  getAllCategorys,
  type Category,
} from "../../../services/categoryService";
import { createProduct } from "../../../services/productService";
import type { CreateProductDto } from "../../../services/productService";
import { uploadImage } from "../../../services/fileService";
import { toast } from "react-toastify";

interface AddProductProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProduct({ onClose, onSuccess }: AddProductProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryID: 0,
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    getAllCategorys()
      .then((data) => {
        setCategorys(data);
      })
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
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
        img: uploadedImage,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      };
      console.log("Payload gửi:", payload);
      await createProduct(payload);
      toast.success("Thêm sản phẩm thành công!");
      onSuccess(); // Gọi để reload lại danh sách
      onClose(); // Đóng modal
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <Typography variant="h5" align="center">
        Add Products
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            label="Price"
            variant="outlined"
            size="small"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
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
