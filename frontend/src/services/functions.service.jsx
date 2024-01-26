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

  static returnAdmin = async () => {
    try {
      const res = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/isadmin`
      );
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
