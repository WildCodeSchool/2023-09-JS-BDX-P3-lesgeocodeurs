import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function Cars() {
  function rtn() {
    window.history.back();
  }

  const { getRegisterStorage } = useTheContext();
  return (
    <div className="cars-container">
      <button type="submit" className="back" onClick={rtn}>
        &larr; Retour
      </button>
      <h1 className="cars-title">Mes véhicules</h1>
      <div className="my-car">
        <MDBCard border>
          {[getRegisterStorage]?.map((car) => (
            <div className="one-car">
              <MDBCardBody>
                <div>
                  <MDBCardTitle>
                    {car.brand} {car.model}
                  </MDBCardTitle>
                  <MDBCardText>Type de prise : {car.plugType}</MDBCardText>
                </div>
                <div className="btn-delete-car">
                  <MDBBtn size="sm">Supprimer</MDBBtn>
                </div>
              </MDBCardBody>
            </div>
          ))}
        </MDBCard>
      </div>
      <div className="add-car">
        <Link to="/addcar">
          <MDBBtn type="submit" className="mb-4" block>
            Ajouter un véhicule
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
