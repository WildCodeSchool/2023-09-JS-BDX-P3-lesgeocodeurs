import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { DateTime } from "luxon";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import apiService from "../services/api.service";

export default function Reservation() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("token");
      const token = jwtDecode(jwtToken);
      try {
        const { data } = await axios.get(
          `http://localhost:3310/api/reservation/users/${token.id}`
        );
        setReservations(
          data
            .map((r) => ({
              ...r,
              datetime: DateTime.fromISO(r.datetime),
            }))
            .filter((r) => r.is_cancelled === 0)
        );
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchData();
  }, []);

  const now = DateTime.local();
  const future = reservations
    .filter((r) => r.datetime > now)
    .sort((a, b) => a.datetime - b.datetime);
  const past = reservations
    .filter((r) => r.datetime < now)
    .sort((a, b) => b.datetime - a.datetime);

  const handleCancel = (id) => {
    apiService.put(`http://localhost:3310/api/reservation/cancel/${id}`);
  };

  return (
    <div className="reservation-container">
      <button
        type="submit"
        className="back"
        onClick={() => window.history.back()}
      >
        &larr; Retour
      </button>

      <h1 className="reservation-title">Mes Réservations</h1>
      <p className="history-reservation">A venir</p>
      {future &&
        future.map((r) => (
          <MDBCard border key={r.id}>
            <MDBCardBody>
              <div className="reservation-text">
                <MDBCardTitle>
                  {r.datetime.toFormat("dd/MM/yyyy HH:mm")}
                </MDBCardTitle>
                <MDBCardText>{r.station_name}</MDBCardText>
                <MDBCardText>{r.station_address}</MDBCardText>
                <MDBCardText>{r.charging_point_name}</MDBCardText>
              </div>
              <div className="btn-delete-reservation">
                <MDBBtn size="sm" onClick={() => handleCancel(r.id)}>
                  Annuler
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        ))}
      <p className="history-reservation">Passées</p>
      {past &&
        past.map((r) => (
          <MDBCard border key={r.id}>
            <MDBCardBody>
              <div className="reservation-text">
                <MDBCardTitle>
                  {r.datetime.toFormat("dd/MM/yyyy HH:mm")}
                </MDBCardTitle>
                <MDBCardText>{r.station_name}</MDBCardText>
                <MDBCardText>{r.station_address}</MDBCardText>
                <MDBCardText>{r.charging_point_name}</MDBCardText>
              </div>
            </MDBCardBody>
          </MDBCard>
        ))}
    </div>
  );
}
