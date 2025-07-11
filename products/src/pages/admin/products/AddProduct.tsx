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
import { useAddProductViewModel } from "../../../viewmodels/productadmin/addProductViewModel";
interface AddProductProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProduct({ onClose, onSuccess }: AddProductProps) {
  const {
    formData,
    imagePreview,
    categorys,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useAddProductViewModel(onClose, onSuccess);

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
            onChange={handleChange}
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
          onChange={handleChange}
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
