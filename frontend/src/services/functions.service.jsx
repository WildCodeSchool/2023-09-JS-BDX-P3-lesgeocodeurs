import apiService from "./api.service";

class FunctionsService {
  static fetchChargingPoint = async (chargingPointId) => {
    apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/chargingpoint/${chargingPointId}`
    );
  };

  static fetchStations = async () => {
    apiService.get(`${import.meta.env.VITE_BACKEND_URL}/api/station`);
  };
}

const functionsService = new FunctionsService();
export default functionsService;
