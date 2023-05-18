import "./App.css";
import RoutesPath from "../Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserAuth } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";
import Layout from "./hocs/Layout/Layout";
function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <RoutesPath />
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
