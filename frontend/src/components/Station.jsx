import { MarkerF } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { useTheContext } from "../context/Context";

export default function Station({
  station,
  setSelectedStation,
  setChargingPoints,
}) {
  const { apiService } = useTheContext();

  // Fonction qui récupère les bornes d'une station
  const fetchChargingPoints = async (stationId) => {
    try {
      const response = await apiService.get(
        `/chargingpoint?station_id=${stationId}`
      );
      setChargingPoints(response);
    } catch (err) {
      console.error(err);
    }
  };

  // Quand on clique sur un marqueur, sélectionne la station et ses bornes
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
    />
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  setSelectedStation: PropTypes.func.isRequired,
  setChargingPoints: PropTypes.func.isRequired,
};
