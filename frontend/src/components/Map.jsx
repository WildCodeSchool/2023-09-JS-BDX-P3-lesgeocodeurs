import { GoogleMap, MarkerClustererF, MarkerF } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import Station from "./Station";
import Places from "./Places";
// import data from "../data-test.json";
// import getLocationIcon from "../assets/get-location.svg";
import myLocationIcon from "../assets/my-location.svg";

export default function Map() {
  const [stations, setStations] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [chargingPoints, setChargingPoints] = useState(null);

  const { coords, getPosition } = useGeolocated();
  const mapRef = useRef();
  const position = useMemo(
    () => ({ lat: 46.57829080854987, lng: 2.528225829979713 }),
    []
  );

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/station");
        setStations(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStations();
  }, []);

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
        >
          {coords && (
            <MarkerF
              position={{ lat: coords.latitude, lng: coords.longitude }}
              icon={myLocationIcon}
            />
          )}
          {stations?.length > 0 && (
            <MarkerClustererF>
              {(clusterer) => (
                <>
                  {stations.map((station) => (
                    <Station
                      key={station.id}
                      station={station}
                      clusterer={clusterer}
                      setSelectedStation={setSelectedStation}
                      setChargingPoints={setChargingPoints}
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
          <strong>{selectedStation.name}</strong>
          <div>{selectedStation.address}</div>
          <br />
          <strong>Bornes</strong>
          {chargingPoints?.map((cp) => (
            <div key={cp.id}>
              <span>{cp.name}</span>
              <span> ({cp.power} kW)</span>
              <div>
                {cp.plug_type?.map((pt) => (
                  <span key={pt}>{pt} </span>
                ))}
              </div>
              <br />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
