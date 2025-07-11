import * as React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { AddCategory } from "./AddCategory";
import EditCategory from "./EditCategory";
import { useCategoryListViewModel } from "../../../viewmodels/category/listCategoryViewModel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CategoryList() {
  const vm = useCategoryListViewModel();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Modal thêm */}
      <Modal open={vm.openAddModal} onClose={() => vm.setOpenAddModal(false)}>
        <Box sx={style}>
          <AddCategory
            onClose={() => vm.setOpenAddModal(false)}
            onSuccess={vm.fetchCategorys}
          />
        </Box>
      </Modal>

      {/* Modal sửa */}
      <Modal open={vm.editModalOpen} onClose={() => vm.setEditModalOpen(false)}>
        <Box sx={style}>
          <EditCategory
            category={vm.selectedCategory}
            onClose={() => vm.setEditModalOpen(false)}
            onUpdated={vm.fetchCategorys}
          />
        </Box>
      </Modal>

      <Typography gutterBottom variant="h5" sx={{ p: 2 }}>
        Category List
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} sx={{ px: 2, mb: 1 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={vm.searchText}
          onChange={(e) => vm.handleSearch(e.target.value)}
          sx={{ minWidth: 300 }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={() => vm.setOpenAddModal(true)}
          sx={{ height: 40 }}
        >
          Add
        </Button>
      </Stack>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vm.categorys
              .slice(vm.page * vm.rowsPerPage, vm.page * vm.rowsPerPage + vm.rowsPerPage)
              .map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <img
                      src={`https://localhost:7204/uploads/${category.logo}`}
                      alt={category.logo}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="center">{category.brand}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <EditIcon
                        onClick={() => {
                          vm.setSelectedCategory(category);
                          vm.setEditModalOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "blue" }}
                      />
                      <DeleteIcon
                        onClick={() => vm.handleDelete(category.id)}
                        style={{ cursor: "pointer", color: "darkred" }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={vm.categorys.length}
        rowsPerPage={vm.rowsPerPage}
        page={vm.page}
        onPageChange={(_e, newPage) => vm.setPage(newPage)}
        onRowsPerPageChange={(e) => {
          vm.setRowsPerPage(+e.target.value);
          vm.setPage(0);
        }}
      />
    </Paper>
  );
}
