import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Error404 from "./src/hocs/Errors/Error404";
import Home from "./src/hocs/Home/Home";
import AboutUs from "./src/hocs/AboutUs/AboutUs";
import Products from "./src/hocs/Products/Products";

function RoutesPath() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="*" element={<Error404 />} />
      {/* home display */}

      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/productos" element={<Products />} />
    </Routes>
  );
}

export default RoutesPath;
