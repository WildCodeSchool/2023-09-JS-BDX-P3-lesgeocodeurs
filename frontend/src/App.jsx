import "./styles/index.scss";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Register />
      <NavBar />
    </div>
  );
}

export default App;
