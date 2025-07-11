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
// import React, { useEffect, useState } from "react";
// import {
//   getById,
//   getByIdCategory,
//   type Product,
// } from "../../../services/productService";
// import {
//   getAllCategorys,
//   type Category,
// } from "../../../services/categoryService";
// import { toast } from "react-toastify";
import { type PromotionDto } from "../../../services/promotionService";
import { useEditPromotionViewModel } from "../../../viewmodels/promotion/editPromotionViewModel";

type Props = {
  promotion: PromotionDto | null;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditPromotion({
  promotion,
  onClose,
  onUpdated,
}: Props) {
  const {
    formData,
    handleInputChange,
    setFormData,
    handleSubmit,
    categories,
    products,
  } = useEditPromotionViewModel(promotion, onUpdated, onClose);

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <Typography variant="h5" align="center">
        Sửa khuyến mãi
      </Typography>
      <Box height={30}></Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Tên khuyến mãi"
            variant="outlined"
            size="small"
            fullWidth
            name="name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Grid>

        <TextField
          label="Hãng xe"
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
          {categories.map((category: any) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Tên xe"
          variant="outlined"
          size="small"
          select
          fullWidth
          name="productId"
          value={formData.productId}
          onChange={(e) =>
            setFormData({ ...formData, productId: Number(e.target.value) })
          }
        >
          {products.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        <Grid size={{ xs: 6 }}>
          <TextField
            label="Số lượng"
            variant="outlined"
            size="small"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            label="Giá trị khuyến mãi"
            variant="outlined"
            size="small"
            type="number"
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            label="Ngày bắt đầu"
            variant="outlined"
            size="small"
            type="date" // ✅ Đặt đúng kiểu input
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true, // ✅ Để label không đè lên giá trị ngày
            }}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            label="Ngày kết thúc"
            variant="outlined"
            size="small"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

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
