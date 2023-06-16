import "./App.css";
import RoutesPath from "../Routes";

import { ModeContext } from "./context/DarkLightModeContext";
import { useContext } from "react";

function App() {
  const { mode } = useContext(ModeContext);
  return (
    <div className={`${mode === "light" && "light-theme"}`}>
      <RoutesPath />
    </div>
  );
}

export default App;
