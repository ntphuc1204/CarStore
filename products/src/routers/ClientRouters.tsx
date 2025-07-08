import { Routes, Route } from "react-router-dom";
import HomeClient from "../pages/client/HomeClient";

import Register from "../pages/client/Account/Register";
import Login from "../pages/client/Account/Login";
import ProductDetail from "../pages/client/Products/ProductDetail";
import Booking from "../pages/client/Booking";
import Status from "../pages/client/Status";
import ProductClient from "../pages/client/ProductClient";
import CategoryClient from "../pages/client/CategoryClient";
import AccountPage from "../pages/client/Account/AccountPage";

export default function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeClient />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/status" element={<Status />} />
      <Route path="/Products/" element={<ProductClient />} />
      <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      <Route path="/Products/category" element={<CategoryClient />} />
      <Route path="/AccountPage" element={<AccountPage />} />
    </Routes>
  );
}
