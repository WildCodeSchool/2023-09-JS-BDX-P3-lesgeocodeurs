import "./styles/index.scss";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Register />
      <Outlet />
      <NavBar />
    </div>
  );
}

export default App;
