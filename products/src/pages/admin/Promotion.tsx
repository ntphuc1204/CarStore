import { Box } from "@mui/material";
import Navbar from "../../components/admin/Navbar";
import Sidenav from "../../components/admin/Sidenav";
import PromotionList from "./promotion/PromotionList";

export default function Promotion() {
  return (
    <>
      <div className="bgcolor">
        <Navbar></Navbar>
        <Box height={60}></Box>
        <Box sx={{ display: "flex", padding: 3 }}>
          <Sidenav></Sidenav>
          <PromotionList></PromotionList>
        </Box>
      </div>
    </>
  );
}
