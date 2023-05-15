import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Error404 from "./src/hocs/Errors/Error404";
import Home from "./src/hocs/Home/Home";
import AboutUs from "./src/hocs/AboutUs/AboutUs";
import Products from "./src/hocs/Products/Products";
import Register from "./src/hocs/Register/Register";
import Login from "./src/hocs/Login/Login";
import { UserAuth } from "./src/context/AuthContext";
import AdminDashboard from "./src/hocs/Admin/AdminDashboard";
import AdminManagment from "./src/components/Admin/AdminManagment";
import ProductsDetails from "./src/hocs/ProductDetail/ProductsDetail";
import { useState } from "react";
function RoutesPath(props) {
  const { user } = UserAuth();
  const { getProductById } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />
        {/* home display */}

        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Login />} />
        <Route
          path="/detalleproducto/:productId"
          element={<ProductsDetails />}
        />

        {/* ADMIN ROUTES */}
        {user && user.rol === "Admin" ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/agregarproducto" element={<AdminManagment />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesPath;
