import "./App.css";
import RoutesPath from "../Routes";

import { ModeContext } from "./context/DarkLightModeContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { LoadingContext } from "./context/LoadingContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function App() {
  const { mode } = useContext(ModeContext);
  const { isloading } = useContext(LoadingContext);
  return (
    <div className={`${mode === "light" && "light-theme"}`}>
      {isloading && <LoadingSpinner />}
      <RoutesPath />
    </div>
  );
}

export default App;
