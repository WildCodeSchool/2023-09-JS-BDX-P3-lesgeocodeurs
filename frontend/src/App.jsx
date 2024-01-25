import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useTheContext } from "./context/Context";

function App() {
  const { getUserInfos } = useTheContext();
  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <div>
      <div className="global-container-outlet">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
}

export default App;
