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
import { useEditProductViewModel } from "../../../viewmodels/productadmin/editProductViewModel";
import type { Product } from "../../../services/productService";

type Props = {
  product: Product | null;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditProduct({ product, onClose, onUpdated }: Props) {
  const {
    formData,
    categorys,
    imagePreview,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  } = useEditProductViewModel(product, onClose, onUpdated);

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
          onChange={handleInputChange}
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
