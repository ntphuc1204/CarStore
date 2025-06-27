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
import {
  getAllProducts,
  searchProducts,
  type Product,
} from "../../../services/productService";
import AddProduct from "./AddProduct";
import { deleteProduct } from "../../../services/productService";
import { toast } from "react-toastify";
import EditProduct from "./EditProduct";
import SearchIcon from "@mui/icons-material/Search";

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

export default function ProductList() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );
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
  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  React.useEffect(() => {
    fetchProducts();
  }, [reload]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      const data = await getAllProducts();
      setProducts(data);
      return;
    }

    try {
      const results = await searchProducts(value);
      setProducts(results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      try {
        await deleteProduct(id);
        toast.success("Xóa sản phẩm thành công!");
        fetchProducts();
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
            <AddProduct
              onClose={() => setOpen(false)}
              onSuccess={handleReload}
            ></AddProduct>
          </Box>
        </Modal>
        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Box sx={style}>
            <EditProduct
              product={selectedProduct}
              onClose={() => setEditModalOpen(false)}
              onUpdated={fetchProducts}
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
              <TableCell>Name</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quanty</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="center">
                    <img
                      src={`https://localhost:7204/uploads/${product.img}`}
                      alt={product.name}
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{product.categoryName}</TableCell>
                  <TableCell align="center">
                    ${product.price.toLocaleString("de-DE")}
                  </TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <EditIcon
                        onClick={() => handleEdit(product)}
                        style={{
                          fontSize: "20px",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      />

                      <DeleteIcon
                        onClick={() => handleDelete(product.id)}
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
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
