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
import {
  getById,
  getByIdCategory,
  type Product,
} from "../../../services/productService";
import {
  getAllCategorys,
  type Category,
} from "../../../services/categoryService";
import { toast } from "react-toastify";
import {
  updatePromotion,
  type PromotionDto,
} from "../../../services/promotionService";

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
  const [products, setProduct] = useState<Product[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [productDetail, setProductDetail] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    id: promotion?.id || 0,
    title: promotion?.title || "",
    categoryID: 0,
    productId: promotion?.productId || 0,
    quantity: promotion?.quantity || 0,
    discountPercent: promotion?.discountPercent || 0,
    startDate: promotion?.startDate
      ? formatDateForInput(promotion.startDate)
      : "",
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
      (async () => {
        const product = await getById(promotion.productId);
        console.log(product);
        setProductDetail(product);
      })();
    }
  }, [promotion]);

  useEffect(() => {
    if (productDetail) {
      setFormData((prev) => ({
        ...prev,
        categoryID: productDetail.categoryID,
      }));
    }
  }, [productDetail]);

  useEffect(() => {
    getAllCategorys()
      .then(setCategorys)
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, []);

  useEffect(() => {
    if (formData.categoryID) {
      (async () => {
        const data = await getByIdCategory(formData.categoryID);
        setProduct(data);
      })();
    }
  }, [formData.categoryID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!promotion?.id) {
      console.error("ID không hợp lệ");
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { categoryID, ...submitData } = formData;
      await updatePromotion(promotion?.id, submitData);
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
        Sửa khuyến mãi
      </Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }}>
        <CloseIcon />
      </IconButton>
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
          {categorys.map((category) => (
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
