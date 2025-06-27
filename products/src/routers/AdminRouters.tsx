import { Routes, Route } from "react-router-dom";
import LoginAdmin from "../pages/admin/LoginAdmin";
import Home from "../pages/admin/Home";
import Products from "../pages/admin/Products";
import RequireAdmin from "./RequireAdmin";
import Categorys from "../pages/admin/Categorys";
import Booking from "../pages/admin/Booking";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginAdmin />} />
      <Route
        path="/Home"
        element={
          <RequireAdmin>
            <Home />
          </RequireAdmin>
        }
      />
      <Route
        path="/Products"
        element={
          <RequireAdmin>
            <Products />
          </RequireAdmin>
        }
      />
      <Route
        path="/Categorys"
        element={
          <RequireAdmin>
            <Categorys />
          </RequireAdmin>
        }
      />
      <Route
        path="/booking"
        element={
          <RequireAdmin>
            <Booking />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}
