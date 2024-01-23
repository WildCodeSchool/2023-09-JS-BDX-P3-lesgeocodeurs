import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import apiService from "../services/api.service";
import Station from "./Station";
import Places from "./Places";
// import data from "../data-test.json";
// import getLocationIcon from "../assets/get-location.svg";
import myLocationIcon from "../assets/my-location.svg";

export default function Map(/* { stations } */) {
  const [stations, setStations] = useState([]);

  const [selectedStation, setSelectedStation] = useState(null);
  const [chargingPoints, setChargingPoints] = useState(null);

  const { coords, getPosition } = useGeolocated();
  const mapRef = useRef();
  const position = useMemo(
    () => ({ lat: 46.57829080854987, lng: 2.528225829979713 }),
    []
  );

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const setFocus = (place, zoom) => {
    mapRef.current?.setZoom(zoom);
    mapRef.current?.panTo(place);
    mapRef.current?.setCenter(place);
  };

  const handleCenter = () => {
    getPosition();
    if (coords) {
      setFocus({ lat: coords.latitude, lng: coords.longitude }, 15);
    }
  };

  const handleMapClick = () => {
    setSelectedStation(null);
    setChargingPoints(null);
  };

  const handleMove = async () => {
    const bounds = mapRef.current?.getBounds().toJSON();
    console.info(bounds);
    const newStations = await apiService.post(
      "http://localhost:3310/api/station/bounds",
      bounds
    );
    console.info(newStations);
    setStations(newStations);
  };

  // Hack to stop Google Maps spamming the console with errors
  /* eslint-disable */
  const previousPreventDefault = TouchEvent.prototype.preventDefault;
  TouchEvent.prototype.preventDefault = function () {
    if (this.cancelable) {
      previousPreventDefault.call(this);
    }
  };
  /* eslint-enable */

  return (
    <>
      <div className="map">
        <div className="map-controls" style={{ display: "flex" }}>
          <Places setFocus={setFocus} />
          <MDBBtn onClick={handleCenter}>
            <span className="material-symbols-outlined">my_location</span>
          </MDBBtn>
        </div>

        <GoogleMap
          zoom={5}
          center={position}
          mapContainerClassName="map"
          options={{ disableDefaultUI: true }}
          onLoad={onLoad}
          onClick={handleMapClick}
          /* onBoundsChanged={handleMove} */
          onIdle={handleMove}
        >
          {coords && (
            <MarkerF
              position={{ lat: coords.latitude, lng: coords.longitude }}
              icon={myLocationIcon}
            />
          )}
          {stations?.length > 0 && (
            <>
              {stations.map((station) => (
                <Station
                  key={station.id}
                  station={station}
                  setSelectedStation={setSelectedStation}
                  setChargingPoints={setChargingPoints}
                />
              ))}
            </>
          )}
        </GoogleMap>
      </div>

      {selectedStation && (
        <div className="station-modal">
          <strong>{selectedStation.name}</strong>
          <div>{selectedStation.address}</div>
          <br />
          <strong>Bornes</strong>
          {chargingPoints?.map((cp) => (
            <div key={cp.id}>
              <span>{cp.name}</span>
              <span> ({cp.power} kW)</span>
              <div>
                {cp.plug_types?.map((pt) => (
                  <span key={pt}>{pt} </span>
                ))}
              </div>
              <Link to={`/newreservation/${cp.id}`}>Réserver cette borne</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* Map.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}; */
