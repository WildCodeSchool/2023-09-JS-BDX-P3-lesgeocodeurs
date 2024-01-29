import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";
import Station from "./Station";
import Places from "./Places";
import myLocationIcon from "../assets/my-location.svg";

export default function Map() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [chargingPoints, setChargingPoints] = useState(null);

  const { apiService, user } = useTheContext();
  const { coords, getPosition } = useGeolocated();
  const mapRef = useRef();

  // Position par défaut, au centre de la France
  const position = useMemo(
    () => ({ lat: 46.57829080854987, lng: 2.528225829979713 }),
    []
  );

  // Chargement de la carte
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Fonction qui déplace et zoom sur la carte
  const setFocus = (place, zoom) => {
    mapRef.current?.setZoom(zoom);
    mapRef.current?.panTo(place);
    mapRef.current?.setCenter(place);
  };

  // Fonction qui récupère la géoloc
  const handleCenter = () => {
    getPosition();
    if (coords) {
      setFocus({ lat: coords.latitude, lng: coords.longitude }, 15);
    }
  };

  // Désélectionne la station quand on clique sur le fond de carte
  const handleMapClick = () => {
    setSelectedStation(null);
    setChargingPoints(null);
  };

  // Quand on se déplace sur la carte, récupère les stations à afficher à l'écran
  const handleMove = async () => {
    const bounds = mapRef.current?.getBounds().toJSON();
    const newStations =
      mapRef.current?.getZoom() > 7
        ? await apiService.post(`/station/bounds`, bounds)
        : [];
    setStations(newStations);
  };

  // Code qui empêche Google Maps de spammer des erreurs dans la console
  /* eslint-disable */
  const previousPreventDefault = TouchEvent.prototype.preventDefault;
  TouchEvent.prototype.preventDefault = function () {
    if (this.cancelable) {
      previousPreventDefault.call(this);
    }
  };
  /* eslint-enable */

  return (
    <div className="map-page">
      <div className="map-container">
        {/* Barre de recherche et géolocalisation */}
        <div className="map-controls">
          <Places setFocus={setFocus} />
          <MDBBtn onClick={handleCenter}>
            <span className="material-symbols-outlined">my_location</span>
          </MDBBtn>
        </div>

        {/* Carte des stations */}
        <GoogleMap
          zoom={5}
          center={position}
          mapContainerClassName="map"
          options={{ disableDefaultUI: true }}
          onLoad={onLoad}
          onClick={handleMapClick}
          onIdle={handleMove}
        >
          {/* Marqueur "ma position" */}
          {coords && (
            <MarkerF
              position={{ lat: coords.latitude, lng: coords.longitude }}
              icon={myLocationIcon}
            />
          )}
          {stations?.length > 0 && (
            <>
              {stations.map((station) => (
                // Marqueur de station
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

      {/* Bloc d'informations sur la station */}
      {selectedStation && (
        <div className="station-modal">
          <h2>{selectedStation.name}</h2>
          <div>{selectedStation.address}</div>
          <br />
          <h3>Bornes</h3>
          {chargingPoints?.map((cp) => (
            <div key={cp.id} className="charging-point-div">
              <strong>{cp.name}</strong>
              <div>Puissance : {cp.power} kW</div>
              <div>Prises : {cp.plug_types?.join(", ")}</div>
              {user && (
                <Link
                  to={`/newreservation/${cp.id}`}
                  className="new-reservation-btn"
                >
                  Réserver cette borne
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
