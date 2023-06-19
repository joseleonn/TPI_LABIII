import { AuthContextProvider } from "../../context/AuthContext";
import { CartContextProvider } from "../../context/CartContext";
import { DarkLightModeContextProvider } from "../../context/DarkLightModeContext";
import { LoadingContextProvider } from "../../context/LoadingContext";

const ContextProvider = ({ children }) => {
  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <DarkLightModeContextProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </DarkLightModeContextProvider>
      </AuthContextProvider>
    </LoadingContextProvider>
  );
};

export default ContextProvider;
