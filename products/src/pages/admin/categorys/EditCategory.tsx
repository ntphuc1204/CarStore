import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEditCategoryViewModel } from "../../../viewmodels/category/editCategoryViewModel";
import { type Category } from "../../../services/categoryService";

type Props = {
  category: Category | null;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditCategory({ category, onClose, onUpdated }: Props) {
  const {
    formData,
    imagePreview,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useEditCategoryViewModel(category, onClose, onUpdated);

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
              onChange={handleChange}
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
              onChange={handleChange}
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
