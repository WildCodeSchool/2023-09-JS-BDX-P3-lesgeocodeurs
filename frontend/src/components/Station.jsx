import { MarkerF } from "@react-google-maps/api";
import PropTypes from "prop-types";

export default function Station({ station, setSelectedStation, clusterer }) {
  return (
    <MarkerF
      position={{
        lat: station.consolidated_latitude,
        lng: station.consolidated_longitude,
      }}
      onClick={() => {
        setSelectedStation(station);
      }}
      clusterer={clusterer}
    />
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    consolidated_latitude: PropTypes.number.isRequired,
    consolidated_longitude: PropTypes.number.isRequired,
  }).isRequired,
  setSelectedStation: PropTypes.func.isRequired,
  clusterer: PropTypes.shape.isRequired,
};
