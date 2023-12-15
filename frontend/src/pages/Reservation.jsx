import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

export default function Reservation() {
  return (
    <div className="reservation-container">
      <h2 className="back"> &larr; Retour</h2>

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
