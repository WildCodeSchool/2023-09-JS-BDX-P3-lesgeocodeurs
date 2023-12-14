import { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Station from "../components/Station";
import data from "../data-test.json";

export default function MyMap() {
  const position = { lat: 46.57829080854987, lng: 2.528225829979713 };
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map">
        <Map
          zoom={5}
          center={position}
          gestureHandling="greedy"
          disableDefaultUI
          onClick={() => setSelectedStation(null)}
          /* mapId="baf145c89ada9afb" */
        >
          {data.map((station) => (
            <Station
              key={station.id_station_itinerance}
              station={station}
              setSelectedStation={setSelectedStation}
            />
          ))}
        </Map>
      </div>
      {selectedStation && (
        <div className="station-modal">
          <strong>{selectedStation.nom_station}</strong>
          <div>{selectedStation.adresse_station}</div>
          <div>{selectedStation.id_station_itinerance}</div>
          <div>{selectedStation.implantation_station}</div>
          <div>Nombre de bornes : {selectedStation.nbre_pdc}</div>
          <div>Puissance : {selectedStation.puissance_nominale} kW</div>

          <div>{selectedStation.gratuit ? "Gratuit" : "Payant"}</div>
          <div>{selectedStation.condition_acces}</div>
          <div>Horaires : {selectedStation.horaires}</div>
        </div>
      )}
    </APIProvider>
  );
}
