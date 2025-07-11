import {
  Box, Button, Divider, Grid, IconButton, Modal, Paper, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TextField, Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { useProductListViewModel } from "../../../viewmodels/productadmin/listProductViewModel";

const style = {
  position: "absolute", top: "50%", left: "50%",
  transform: "translate(-50%, -50%)", width: 480,
  bgcolor: "background.paper", border: "2px solid #000",
  boxShadow: 24, p: 4,
};

export default function ProductList() {
  const {
    products, page, rowsPerPage, searchText, selectedProduct,
    addModalOpen, editModalOpen,
    setPage, setRowsPerPage, setAddModalOpen, setEditModalOpen,
    setSelectedProduct, handleReload, handleSearch, handleDelete,
  } = useProductListViewModel();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Box sx={style}>
          <AddProduct onClose={() => setAddModalOpen(false)} onSuccess={handleReload} />
        </Box>
      </Modal>

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={style}>
          <EditProduct
            product={selectedProduct}
            onClose={() => setEditModalOpen(false)}
            onUpdated={handleReload}
          />
        </Box>
      </Modal>

      <Typography variant="h5" sx={{ p: 2 }}>Products List</Typography>
      <Divider />

      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <TextField
          label="Search" size="small" fullWidth
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={() => setAddModalOpen(true)}>
          Add
        </Button>
      </Stack>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={`https://localhost:7204/uploads/${product.img}`}
                    alt={product.name}
                    style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell align="center">{product.categoryName}</TableCell>
                <TableCell align="center">${product.price.toLocaleString("de-DE")}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <EditIcon
                      sx={{ color: "blue", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setEditModalOpen(true);
                      }}
                    />
                    <DeleteIcon
                      sx={{ color: "darkred", cursor: "pointer" }}
                      onClick={() => handleDelete(product.id)}
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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
}
