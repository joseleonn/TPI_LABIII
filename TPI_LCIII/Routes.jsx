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
import ProductDetail from "./src/components/Catalog/ProductDetail/ProductDetail";
import AdminDashboard from "./src/hocs/Admin/AdminDashboard";

function RoutesPath() {
  // const location = useLocation();
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
        <Route path="/detalleproducto" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesPath;
