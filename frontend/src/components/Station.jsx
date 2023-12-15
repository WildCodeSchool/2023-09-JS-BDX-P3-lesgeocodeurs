import { Marker } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

export default function Station({ station, setSelectedStation }) {
  return (
    <Marker
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