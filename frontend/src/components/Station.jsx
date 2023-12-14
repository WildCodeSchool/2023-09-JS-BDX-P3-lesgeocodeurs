/* import { Marker } from "@vis.gl/react-google-maps"; */
import { MarkerF } from "@react-google-maps/api";
import PropTypes from "prop-types";

export default function Station({ station, setSelectedStation }) {
  return (
    <MarkerF
      position={{
        lat: station.consolidated_latitude,
        lng: station.consolidated_longitude,
      }}
      onClick={() => {
        setSelectedStation(station);
      }}
    />
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    consolidated_latitude: PropTypes.number.isRequired,
    consolidated_longitude: PropTypes.number.isRequired,
  }).isRequired,
  setSelectedStation: PropTypes.func.isRequired,
};
