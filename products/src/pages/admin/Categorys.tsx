import { Box } from "@mui/material";
import Sidenav from "../../components/admin/Sidenav";
import Navbar from "../../components/admin/Navbar";
import CategoryList from "./categorys/CategoryList";

export default function Categorys() {
  return (
    <>
      <div className="bgcolor">
        <Navbar></Navbar>
        <Box height={60}></Box>
        <Box sx={{ display: "flex", padding: 3 }}>
          <Sidenav></Sidenav>
          <CategoryList></CategoryList>
        </Box>
      </div>
    </>
  );
}
