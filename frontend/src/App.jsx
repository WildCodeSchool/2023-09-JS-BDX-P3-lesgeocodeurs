import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/index.scss";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      {/* <Register /> */}
      <Outlet />
      <NavBar />
    </div>
  );
}

export default App;
