import { Box } from "@mui/material";
import Sidenav from "../../components/admin/Sidenav";
import Navbar from "../../components/admin/Navbar";
import BookingList from "./booking/BookingList";

export default function Booking() {
  return (
    <>
      <div className="bgcolor">
        <Navbar></Navbar>
        <Box height={60}></Box>
        <Box sx={{ display: "flex", padding: 3 }}>
          <Sidenav></Sidenav>
          <BookingList></BookingList>
        </Box>
      </div>
    </>
  );
}
