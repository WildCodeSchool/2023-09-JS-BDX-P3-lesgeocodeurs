import { Outlet } from "react-router-dom";
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
