import "./App.css";
import RoutesPath from "../Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserAuth } from "./context/AuthContext";
function App() {
  return (
    <AuthContextProvider>
      <RoutesPath />
    </AuthContextProvider>
  );
}

export default App;
