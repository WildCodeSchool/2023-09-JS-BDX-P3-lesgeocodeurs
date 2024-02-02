import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useTheContext } from "./context/Context";

function App() {
  const { getUserInfos, modal } = useTheContext();
  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <>
      <div
        className="global-container-outlet"
        style={modal ? { backgroundColor: "rgba(128, 128, 128, 0.5)" } : {}}
      >
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}

export default App;
