import { MarkerF } from "@react-google-maps/api";
import axios from "axios";
import PropTypes from "prop-types";

export default function Station({
  station,
  clusterer,
  setSelectedStation,
  setChargingPoints,
}) {
  const fetchChargingPoints = async (stationId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/chargingpoint?station_id=${stationId}`
      );
      setChargingPoints(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = () => {
    setSelectedStation(station);
    fetchChargingPoints(station.id);
  };

  return (
    <MarkerF
      position={{
        lat: station.latitude,
        lng: station.longitude,
      }}
      onClick={handleClick}
      clusterer={clusterer}
    />
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  clusterer: PropTypes.shape().isRequired,
  setSelectedStation: PropTypes.func.isRequired,
  setChargingPoints: PropTypes.func.isRequired,
};
