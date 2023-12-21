import React, { useState } from "react";
import {
  MDBBtn,
  MDBSelect,
  MDBDatepicker,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTimepicker,
} from "mdb-react-ui-kit";

export default function MakeReservation() {
  const [isOpen, setIsOpen] = useState();
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

        <MDBSelect
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          data={[
            { text: "AAA", value: 1 },
            { text: "BBB", value: 2 },
            { text: "CCC", value: 3 },
            { text: "DDD", value: 4 },
            { text: "EEE", value: 5 },
            { text: "FFF", value: 6 },
            { text: "GGG", value: 7 },
            { text: "HHH", value: 8 },
          ]}
        />
      </div>
      <div className="btn-reservation">
        <MDBBtn size="sm">Réserver</MDBBtn>
      </div>
    </div>
  );
}
