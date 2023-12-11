import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <Outlet />
      <NavBar />
    </div>
  );
}

export default App;
