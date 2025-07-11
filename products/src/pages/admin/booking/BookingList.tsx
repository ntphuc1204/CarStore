import {
  Box,
  Divider,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import DoneIcon from "@mui/icons-material/Done";
import ComfirmBooking from "./ConfirmBooking";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useBookingListViewModel } from "../../../viewmodels/booking/listBookingViewModel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 860,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BookingList() {
  const {
    page,
    rowsPerPage,
    booking,
    selectedBooking,
    editModalOpen,
    searchText,
    handleChangePage,
    handleChangeRowsPerPage,
    setEditModalOpen,
    fetchBooking,
    handleSearch,
    handleComfirm,
  } = useBookingListViewModel();
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <div>
          <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <Box sx={style}>
              <ComfirmBooking
                booking={selectedBooking}
                onClose={() => setEditModalOpen(false)}
                onUpdated={fetchBooking}
              />
            </Box>
          </Modal>
        </div>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Danh sách đặt xe
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack
          direction="row"
          spacing={2}
          className="my-2 mb-2 "
          sx={{ marginRight: 1, marginLeft: 1 }}
        >
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearch}
            sx={{ minWidth: 300 }}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, height: 36 }}
          ></Typography>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Khách hàng</TableCell>
                <TableCell align="center">Hình ảnh</TableCell>
                <TableCell align="center">SĐT</TableCell>
                <TableCell align="center">Giá tiền</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Xác nhận</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booking
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell align="center">
                      <img
                        src={`https://localhost:7204/uploads/${item.product.img}`}
                        alt={item.product.name}
                        style={{
                          width: 120,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{item.phoneNumber}</TableCell>
                    <TableCell align="center">
                      ${item.total.toLocaleString("de-DE")}
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell>
                      <Stack
                        spacing={0.5}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {(() => {
                          switch (item?.status) {
                            case 0:
                              return (
                                <LibraryAddCheckIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "#FFBF1F",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleComfirm(item)}
                                />
                              );
                            case 3:
                              return (
                                <DoneIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "green",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleComfirm(item)}
                                />
                              );
                            case 2:
                              return (
                                <ClearIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleComfirm(item)}
                                />
                              );
                            case 1:
                              return (
                                <LocalShippingIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "#78e3fd",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleComfirm(item)}
                                />
                              );
                            default:
                              return null;
                          }
                        })()}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="my-mui-table">
          <TablePagination
            sx={{ margin: 0 }}
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={booking.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </>
  );
}
