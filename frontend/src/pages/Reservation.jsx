import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

export default function Reservation() {
  function rtn() {
    window.history.back();
  }
  return (
    <div className="reservation-container">
      <button type="submit" className="back" onClick={rtn}>
        &larr; Retour
      </button>

      <h1 className="reservation-title">Mes Réservations</h1>
      <p className="history-reservation">A venir</p>
      <MDBCard border>
        <MDBCardBody>
          <div>
            <MDBCardTitle>Station ABCDE</MDBCardTitle>
            <MDBCardText>Borne #1</MDBCardText>
            <MDBCardText>Aujourd’hui / 15h - 15h30</MDBCardText>
          </div>
          <div className="btn-delete-reservation">
            <MDBBtn size="sm">Annuler</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
      <p className="history-reservation">Passées</p>
      <MDBCard border>
        <MDBCardBody>
          <div className="past-reservation">
            <MDBCardTitle>Station ABCDE</MDBCardTitle>
            <MDBCardText>Borne #1</MDBCardText>
            <MDBCardText>Hier / 15h - 15h30</MDBCardText>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
