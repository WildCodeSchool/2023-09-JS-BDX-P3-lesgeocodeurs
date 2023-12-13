import { InfoWindow, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import PropTypes from "prop-types";

export default function Station({ station }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Marker
        position={{
          lat: station.consolidated_latitude,
          lng: station.consolidated_longitude,
        }}
        onClick={() => setOpen(true)}
      />
      {open && (
        <InfoWindow
          position={{
            lat: station.consolidated_latitude,
            lng: station.consolidated_longitude,
          }}
          onCloseClick={() => setOpen(false)}
        >
          <strong>{station.nom_station}</strong>
          <p>{station.adresse_station}</p>
        </InfoWindow>
      )}
    </>
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    consolidated_latitude: PropTypes.number.isRequired,
    consolidated_longitude: PropTypes.number.isRequired,
    nom_station: PropTypes.string.isRequired,
    adresse_station: PropTypes.string.isRequired,
  }).isRequired,
};
