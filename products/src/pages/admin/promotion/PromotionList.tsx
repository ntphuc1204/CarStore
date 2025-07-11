import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Divider,
  Button,
  Box,
  Stack,
  Modal,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";
import AddPromotion from "./AddPromotion";
import EditPromotion from "./EditPromotion";
import { usePromotionListViewModel } from "../../../viewmodels/promotion/listPromotionViewModel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PromotionList() {
  const {
    promotions,
    searchText,
    handleSearch,
    handleDelete,
    handleEdit,
    selectedPromotion,
    setSelectedPromotion,
    handleReload,
    open,
    handleOpen,
    handleClose,
    editModalOpen,
    setEditModalOpen,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePromotionListViewModel();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Modal Thêm */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddPromotion onClose={handleClose} onSuccess={handleReload} />
        </Box>
      </Modal>

      {/* Modal Sửa */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={style}>
          <EditPromotion
            promotion={selectedPromotion}
            onClose={() => setEditModalOpen(false)}
            onUpdated={handleReload}
          />
        </Box>
      </Modal>

      {/* Header */}
      <Typography variant="h5" sx={{ padding: "20px" }}>
        Products List
      </Typography>
      <Divider />
      <Box height={10} />

      {/* Thanh tìm kiếm + nút thêm */}
      <Stack direction="row" spacing={2} sx={{ mx: 1 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={handleSearch}
          sx={{ minWidth: 300 }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <Box flexGrow={1} />
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{ height: 40 }}
        >
          Add
        </Button>
      </Stack>

      <Box height={10} />

      {/* Bảng dữ liệu */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Tên khuyến mãi</TableCell>
              <TableCell align="center">Giảm giá</TableCell>
              <TableCell align="center">Số lượng còn</TableCell>
              <TableCell align="center">Số lượng ban đầu</TableCell>
              <TableCell align="center">Ngày bắt đầu</TableCell>
              <TableCell align="center">Ngày kết thúc</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Hoạt động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="center">{item.discountPercent}%</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.initialQuantity}</TableCell>
                  <TableCell align="center">
                    {item.startDate
                      ? format(new Date(item.startDate), "dd-MM-yyyy")
                      : ""}
                  </TableCell>
                  <TableCell align="center">
                    {item.endDate
                      ? format(new Date(item.endDate), "dd-MM-yyyy")
                      : ""}
                  </TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <EditIcon
                        onClick={() => handleEdit(item)}
                        sx={{ color: "blue", cursor: "pointer" }}
                      />
                      <DeleteIcon
                        onClick={() => handleDelete(item.id)}
                        sx={{ color: "darkred", cursor: "pointer" }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <TablePagination
        rowsPerPageOptions={[6, 12, 18]}
        component="div"
        count={promotions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
