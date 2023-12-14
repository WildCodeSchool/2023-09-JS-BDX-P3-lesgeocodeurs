import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import Station from "./Station";
import Places from "./Places";
import data from "../data-test.json";

export default function Map() {
  const position = useMemo(
    () => ({ lat: 46.57829080854987, lng: 2.528225829979713 }),
    []
  );
  const [selectedStation, setSelectedStation] = useState(null);
  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <>
      <div className="map">
        <Places
          setOffice={(place) => {
            mapRef.current?.setZoom(10);
            mapRef.current?.panTo(place);
            mapRef.current?.setCenter(place);
          }}
        />
        <GoogleMap
          zoom={5}
          center={position}
          mapContainerClassName="map"
          options={{ disableDefaultUI: true }}
          onLoad={onLoad}
          onClick={() => setSelectedStation(null)}
        >
          {data.map((station) => (
            <Station
              key={station.id_station_itinerance}
              station={station}
              setSelectedStation={setSelectedStation}
            />
          ))}
        </GoogleMap>
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
    </>
  );
}
