import "./App.css";
import RoutesPath from "../Routes";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <RoutesPath />
      </Router>
    </>
  );
}

export default App;
