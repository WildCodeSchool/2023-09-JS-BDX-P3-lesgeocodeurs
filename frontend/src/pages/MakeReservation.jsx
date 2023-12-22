import {
  MDBBtn,
  MDBDatepicker,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTimepicker,
} from "mdb-react-ui-kit";

export default function MakeReservation() {
  return (
    <div className="makereservation-container">
      <h1>Réservation</h1>
      <h2 className="yourstation">Votre Station</h2>
      <MDBCard border>
        <MDBCardBody>
          <div>
            <MDBCardTitle>Station ABCDE</MDBCardTitle>
            <MDBCardText>Borne #1</MDBCardText>
          </div>
        </MDBCardBody>
      </MDBCard>
      <div className="choixreservation">
        <p className="reservation-select">Choix de la Date</p>
        <MDBDatepicker />
        <p className="reservation-select">Choix de l'horaire</p>
        <MDBTimepicker inline format="24h" />
        <p className="reservation-select">Choix du type de prise</p>
      </div>
      <div className="btn-reservation">
        <MDBBtn size="sm">Réserver</MDBBtn>
      </div>
    </div>
  );
}
