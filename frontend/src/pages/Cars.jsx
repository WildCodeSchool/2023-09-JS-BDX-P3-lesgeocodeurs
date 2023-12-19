import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

export default function Cars() {
  function rtn() {
    window.history.back();
  }

  return (
    <div className="cars-container">
      <button type="submit" className="back" onClick={rtn}>
        &larr; Retour
      </button>
      <h1 className="cars-title">Mes véhicules</h1>
      <div className="my-car">
        <MDBCard border>
          <div className="one-car">
            <MDBCardBody>
              <div>
                <MDBCardTitle>Peugeot 200swag</MDBCardTitle>
                <MDBCardText>Type de prise : ABC</MDBCardText>
              </div>
              <div className="btn-delete-car">
                <MDBBtn size="sm">Supprimer</MDBBtn>
              </div>
            </MDBCardBody>
          </div>
        </MDBCard>
        <MDBCard border>
          <MDBCardBody>
            <div>
              <MDBCardTitle>Peugeot 200swag</MDBCardTitle>
              <MDBCardText>Type de prise : ABC</MDBCardText>
            </div>
            <div className="btn-delete-car">
              <MDBBtn size="sm">Supprimer</MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
      <div className="add-car">
        <MDBBtn type="submit" className="mb-4" block>
          Ajouter un véhicule
        </MDBBtn>
      </div>
    </div>
  );
}
