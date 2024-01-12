import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DateTime } from "luxon";
import { MDBBtn, MDBSelect } from "mdb-react-ui-kit";

export default function NewReservation() {
  const { state } = useLocation();

  const [selectedDate, setSelectedDate] = useState(
    DateTime.local().plus({ days: 1 }).toISODate()
  );
  const [selectedTime, setSelectedTime] = useState("00:00");

  // Générer la liste des 7 prochains jours
  const generateDateOptions = () => {
    const startDate = DateTime.local();
    const dateOptions = [];

    for (let i = 0; i < 7; i += 1) {
      const currentDate = startDate.plus({ days: i + 1 });
      dateOptions.push({
        text: currentDate.toLocaleString({
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        value: currentDate.toISODate(),
      });
    }

    return dateOptions;
  };
  const dateOptions = generateDateOptions();

  // Générer la liste des heures
  const generateTimeOptions = () => {
    const timeOptions = [];
    const startTime = DateTime.fromFormat("00:00", "HH:mm");

    for (let i = 0; i < 48; i += 1) {
      const currentTime = startTime.plus({ hours: i * 0.5 });
      timeOptions.push({
        text: currentTime.toFormat("HH:mm"),
        value: currentTime.toFormat("HH:mm"),
      });
    }

    return timeOptions;
  };
  const timeOptions = generateTimeOptions();

  // Soumettre le rendez-vous
  const handleSubmit = () => {
    const selectedDateTime = DateTime.fromISO(
      `${selectedDate}T${selectedTime}`
    );
    console.info(
      "Rendez-vous programmé pour:",
      selectedDateTime.toFormat("dd/MM/yyyy HH:mm")
    );
    // Ajoutez ici la logique pour traiter le rendez-vous
  };

  return (
    <div className="new-reservation">
      <button
        type="submit"
        className="back"
        onClick={() => window.history.back()}
      >
        &larr; Retour
      </button>

      <h2>Réservation</h2>

      <div>Station : {state?.station?.name}</div>
      <div>Borne : {state?.cp?.name}</div>

      <MDBSelect
        label="Date"
        className="select"
        data={dateOptions}
        value={selectedDate}
        onValueChange={(e) => setSelectedDate(e?.value)}
      />
      <MDBSelect
        label="Heure"
        className="select"
        data={timeOptions}
        value={selectedTime}
        onValueChange={(e) => setSelectedTime(e?.value)}
      />

      <MDBBtn className="submit" type="submit" onClick={handleSubmit}>
        Valider
      </MDBBtn>
    </div>
  );
}
