import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkLightModeContextProvider } from "./context/DarkLightModeContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { LoadingContextProvider } from "./context/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <AuthContextProvider>
        <DarkLightModeContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </DarkLightModeContextProvider>
      </AuthContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
);
