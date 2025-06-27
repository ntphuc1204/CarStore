import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  confirmBooking,
  type BookingDto,
} from "../../../services/bookingService";

type Props = {
  booking: BookingDto | null;
  onClose: () => void;
  onUpdated: () => void;
};
export default function ComfirmBooking({ booking, onClose, onUpdated }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (booking?.product?.img) {
      setImagePreview(`https://localhost:7204/uploads/${booking.product.img}`);
    }
  }, [booking]);

  const handleSubmit = async () => {
    if (!booking?.id) {
      console.error("ID không hợp lệ");
      return;
    }
    try {
      await confirmBooking(booking?.id);
      toast.success("Confirm success!");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <Typography variant="h5" align="center">
        Comfirm Booking
      </Typography>
      <IconButton
        onClick={onClose}
        style={{ position: "absolute", top: "0", right: "0" }}
      >
        <CloseIcon />
      </IconButton>
      <Box height={30}></Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            name="email"
            value={booking?.email}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            label="Client"
            variant="outlined"
            size="small"
            fullWidth
            name="userName"
            value={booking?.userName}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            label="Phone"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            name="phone"
            value={booking?.phoneNumber}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
            name="name"
            value={booking?.product.name}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Address"
            variant="outlined"
            size="small"
            fullWidth
            name="address"
            value={booking?.address}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Category"
            variant="outlined"
            size="small"
            fullWidth
            name="category"
            value={booking?.product.categoryName}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Date"
            value={
              booking?.bookingDate
                ? format(new Date(booking?.bookingDate), "dd-MM-yyyy")
                : ""
            }
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Quantity"
            variant="outlined"
            size="small"
            fullWidth
            name="category"
            value={booking?.quantity}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Total"
            variant="outlined"
            size="small"
            fullWidth
            name="total"
            value={booking?.total.toLocaleString("de-DE")}
          />
        </Grid>
        {imagePreview && (
          <Grid size={{ xs: 12 }}>
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{
                maxHeight: 120,
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
          {(() => {
            switch (booking?.status) {
              case 0:
                return (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                );
              case 1:
                return (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "green" }}
                    onClick={onClose}
                  >
                    Confirmed
                  </Button>
                );
              case 2:
                return (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "red" }}
                    onClick={onClose}
                  >
                    Canceled
                  </Button>
                );
              default:
                return null;
            }
          })()}
        </Grid>
      </Grid>
    </Box>
  );
}
