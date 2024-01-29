import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useTheContext } from "./context/Context";

function App() {
  const { getUserInfos, user } = useTheContext();
  useEffect(() => {
    getUserInfos();
  }, [user]);

  return (
    <>
      <div className="global-container-outlet">
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}

export default App;
