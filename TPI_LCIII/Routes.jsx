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
import AdminManagment from "./src/components/Admin/AdminManagment";
import ProductsDetails from "./src/hocs/ProductDetail/ProductsDetail";
import ShoppingCartHoc from "./src/hocs/ShoppingCartHoc/ShoppingCartHoc";
import AdminDashboardProducts from "./src/hocs/Admin/AdminDashboardProducts";
import AdminDashboardUsers from "./src/hocs/Admin/AdminDashboardUsers";
function RoutesPath() {
  const { user } = UserAuth();

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
        <Route path="/carrito" element={<ShoppingCartHoc />} />

        {/* ADMIN ROUTES */}
        {user && user.rol === "Admin" ? (
          <>
            <Route
              path="/admin/productos"
              element={<AdminDashboardProducts />}
            />
            <Route path="/agregarproducto" element={<AdminManagment />} />
            <Route path="/admin/usuarios" element={<AdminDashboardUsers />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesPath;
