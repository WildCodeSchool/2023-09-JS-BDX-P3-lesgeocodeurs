import { GoogleMap, MarkerClustererF, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { MDBBtn } from "mdb-react-ui-kit";
import Station from "./Station";
import Places from "./Places";
import data from "../data-test.json";
/* import getLocationIcon from "../assets/get-location.svg"; */
import myLocationIcon from "../assets/my-location.svg";

export default function Map() {
  /* eslint-disable */
  // (hack to stop Google Maps spamming the console with errors)
  const previousPreventDefault = TouchEvent.prototype.preventDefault;
  TouchEvent.prototype.preventDefault = function () {
    if (this.cancelable) {
      previousPreventDefault.call(this);
    }
  };
  /* eslint-enable */

  const position = useMemo(
    () => ({ lat: 46.57829080854987, lng: 2.528225829979713 }),
    []
  );
  const [selectedStation, setSelectedStation] = useState(null);
  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const setFocus = (place, zoom) => {
    mapRef.current?.setZoom(zoom);
    mapRef.current?.panTo(place);
    mapRef.current?.setCenter(place);
  };

  const { coords, getPosition } = useGeolocated();
  // console.info(coords);

  const handleClick = () => {
    getPosition();
    if (coords) {
      setFocus({ lat: coords.latitude, lng: coords.longitude }, 15);
    }
  };

  return (
    <>
      <div className="map">
        <div className="map-controls" style={{ display: "flex" }}>
          <Places setFocus={setFocus} />
          <MDBBtn onClick={handleClick}>
            <span className="material-symbols-outlined">my_location</span>
          </MDBBtn>
        </div>
        <GoogleMap
          zoom={5}
          center={position}
          mapContainerClassName="map"
          options={{ disableDefaultUI: true }}
          onLoad={onLoad}
          onClick={() => setSelectedStation(null)}
        >
          {coords && (
            <MarkerF
              position={{ lat: coords.latitude, lng: coords.longitude }}
              icon={myLocationIcon}
            />
          )}
          {data?.length > 0 && (
            <MarkerClustererF>
              {(clusterer) => (
                <>
                  {data.map((station) => (
                    <Station
                      key={station.id_station_itinerance}
                      station={station}
                      setSelectedStation={setSelectedStation}
                      clusterer={clusterer}
                    />
                  ))}
                </>
              )}
            </MarkerClustererF>
          )}
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
