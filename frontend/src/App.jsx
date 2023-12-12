import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ContextProvider } from "./context/Context";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/index.scss";

function App() {
  return (
    <ContextProvider>
      <div>
        <Outlet />
        <NavBar />
      </div>
    </ContextProvider>
  );
}

export default App;
