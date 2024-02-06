import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import NavBar from "./components/NavBar";
import { useTheContext } from "./context/Context";

function App() {
  const { getUserInfos, modal, setModal } = useTheContext();
  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <>
      <div className="global-container-outlet">
        <Outlet />
        {modal ? (
          <div className="confirmation-dialog">
            <p>{modal}</p>
            <MDBBtn size="sm" onClick={() => setModal(false)}>
              Ok
            </MDBBtn>
          </div>
        ) : null}
      </div>
      <NavBar />
    </>
  );
}

export default App;
