import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

import SearchIcon from "@mui/icons-material/Search";
import {
  deletePromotion,
  getAllPromotion,
  searchPromotion,
  type PromotionDto,
} from "../../../services/promotionService";
import AddPromotion from "./AddPromotion";
import EditPromotion from "./EditPromotion";
import { format } from "date-fns";

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
  const [promotion, setPromotion] = React.useState<PromotionDto[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [selectedPromotion, setSelectedPromotion] =
    React.useState<PromotionDto | null>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReload = () => {
    setReload(!reload); // toggle để kích hoạt useEffect
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchPromotion = async () => {
    const data = await getAllPromotion();
    setPromotion(data);
  };

  React.useEffect(() => {
    fetchPromotion();
  }, [reload]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      const data = await getAllPromotion();
      setPromotion(data);
      return;
    }

    try {
      const results = await searchPromotion(value);
      setPromotion(results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleEdit = (promotion: PromotionDto) => {
    setSelectedPromotion(promotion);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa khuyến mãi này không?")) {
      try {
        await deletePromotion(id);
        toast.success("Xóa khuyến mãi thành công!");
        fetchPromotion();
      } catch (err) {
        toast.error("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddPromotion
              onClose={() => setOpen(false)}
              onSuccess={handleReload}
            ></AddPromotion>
          </Box>
        </Modal>
        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Box sx={style}>
            <EditPromotion
              promotion={selectedPromotion}
              onClose={() => setEditModalOpen(false)}
              onUpdated={fetchPromotion}
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
        Products List
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

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, height: 36 }}
        ></Typography>
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {promotion
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="center">{item.discountPercent}%</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.initialQuantity}</TableCell>
                  <TableCell align="center">
                    {item?.startDate
                      ? format(new Date(item?.startDate), "dd-MM-yyyy")
                      : ""}
                  </TableCell>
                  <TableCell align="center">
                    {item?.endDate
                      ? format(new Date(item?.endDate), "dd-MM-yyyy")
                      : ""}
                  </TableCell>
                  <TableCell align="center">{item.status}</TableCell>

                  <TableCell>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <EditIcon
                        onClick={() => handleEdit(item)}
                        style={{
                          fontSize: "20px",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      />

                      <DeleteIcon
                        onClick={() => handleDelete(item.id)}
                        style={{
                          fontSize: "20px",
                          color: "darkred",
                          cursor: "pointer",
                        }}
                      />
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
          rowsPerPageOptions={[6, 12, 18]}
          component="div"
          count={promotion.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
