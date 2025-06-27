import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  updateCategory,
  type Category,
} from "../../../services/categoryService";
import { uploadImage } from "../../../services/fileService";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  category: Category | null;
  onClose: () => void;
  onUpdated: () => void;
};
export default function EditCategory({ category, onClose, onUpdated }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: category?.id || 0,
    name: category?.name || "",
    brand: category?.brand || "",
    newLogo: category?.logo || "",
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
    if (category?.logo) {
      setImagePreview(`https://localhost:7204/uploads/${category.logo}`);
    }
  }, [category]);
  const handleSubmit = async () => {
    if (!category?.id) {
      console.error("ID không hợp lệ");
      return;
    }
    try {
      let imageUrl = formData.newLogo;

      // Nếu người dùng chọn ảnh mới, upload ảnh
      if (selectedImageFile) {
        imageUrl = await uploadImage(selectedImageFile);
      }

      const updatedProduct = {
        ...formData,
        newLogo: imageUrl, // gán URL ảnh đã upload vào
      };

      console.log("Dữ liệu gửi đi:", updatedProduct);

      await updateCategory(category?.id, updatedProduct);
      toast.success("Sửa hãng xe thành công!");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  return (
    <>
      <Box sx={{ p: 2, position: "relative" }}>
        <Typography variant="h5" align="center">
          Add Category
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Brand"
              variant="outlined"
              size="small"
              fullWidth
              name="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
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
    </>
  );
}
