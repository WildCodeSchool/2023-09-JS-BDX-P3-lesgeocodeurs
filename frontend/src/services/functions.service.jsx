import apiService from "./api.service";

class FunctionsService {
  static fetchChargingPoint = async (chargingPointId) => {
    apiService.get(
      `http://localhost:3310/api/chargingpoint/${chargingPointId}`
    );
  };

  static fetchStations = async () => {
    apiService.get("http://localhost:3310/api/station");
  };
}

const functionsService = new FunctionsService();
export default functionsService;
