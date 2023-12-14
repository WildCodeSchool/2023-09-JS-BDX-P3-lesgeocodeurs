import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ContextProvider } from "./context/Context";

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
