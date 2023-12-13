import { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Station from "../components/Station";
import data from "../data-test.json";

export default function MyMap() {
  const position = { lat: 46.57829080854987, lng: 2.528225829979713 };
  const [open, setOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map">
        <Map
          zoom={5}
          center={position}
          gestureHandling="greedy"
          disableDefaultUI
          onClick={() => setOpen(false)}
          /* mapId="baf145c89ada9afb" */
        >
          {data.map((station) => (
            <Station
              key={station.id_station_itinerance}
              station={station}
              setOpen={setOpen}
              setSelectedStation={setSelectedStation}
            />
          ))}
        </Map>
      </div>
      {open && selectedStation && (
        <div className="station-modal">
          <strong>{selectedStation.nom_station}</strong>
          <p>{selectedStation.adresse_station}</p>
        </div>
      )}
    </APIProvider>
  );
}
