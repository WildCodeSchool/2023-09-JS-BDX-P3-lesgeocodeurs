import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useTheContext } from "./context/Context";

function App() {
  const { fetchProtectedData, getUserInfos } = useTheContext();
  useEffect(() => {
    fetchProtectedData();
    getUserInfos();
  }, []);

  return (
    <div>
      <Outlet />
      <NavBar />
    </div>
  );
}

export default App;
