import { Box } from "@mui/material";
import Sidenav from "../../components/admin/Sidenav";
import Navbar from "../../components/admin/Navbar";
import ProductList from "./products/ProductList";

export default function Products() {
  return (
    <>
      <div className="bgcolor">
        <Navbar></Navbar>
        <Box height={60}></Box>
        <Box sx={{ display: "flex", padding: 3 }}>
          <Sidenav></Sidenav>
          <ProductList></ProductList>
        </Box>
      </div>
    </>
  );
}
