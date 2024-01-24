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

  static returnAdmin = async () => {
    try {
      const res = await apiService.get(`http://localhost:3310/api/isadmin`);
      if (res.message === "ok") {
        return res.message;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };
}

export default FunctionsService;
