import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { type BookingDto } from "../../../services/bookingService";
import { useConfirmBookingViewModel } from "../../../viewmodels/booking/comfirmBookingViewModel";

type Props = {
  booking: BookingDto | null;
  onClose: () => void;
  onUpdated: () => void;
};
export default function ComfirmBooking({ booking, onClose, onUpdated }: Props) {
  const { imagePreview, handleSubmit } = useConfirmBookingViewModel(
    booking,
    onClose,
    onUpdated
  );

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <Typography variant="h5" align="center">
        Chi tiết đơn hàng
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
            label="Khách hàng"
            variant="outlined"
            size="small"
            fullWidth
            name="userName"
            value={booking?.userName}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            label="SĐT"
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
            label="Tên xe"
            variant="outlined"
            size="small"
            fullWidth
            name="name"
            value={booking?.product.name}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Địa chỉ"
            variant="outlined"
            size="small"
            fullWidth
            name="address"
            value={booking?.address}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Hãng xe"
            variant="outlined"
            size="small"
            fullWidth
            name="category"
            value={booking?.product.categoryName}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Ngày đặt"
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
            label="Số lượng"
            variant="outlined"
            size="small"
            fullWidth
            name="category"
            value={booking?.quantity}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Tổng tiền"
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
                    Xác nhận đơn hàng
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
                    Đang giao hàng
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
                    Khách hàng đã hủy
                  </Button>
                );
              case 3:
                return (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "red" }}
                    onClick={onClose}
                  >
                    Giao hàng thành công
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
