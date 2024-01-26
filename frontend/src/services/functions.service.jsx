import ApiService from "./api.service";

const apiService = new ApiService();

class FunctionsService {
  static fetchChargingPoint = async (chargingPointId) => {
    apiService.get(`/chargingpoint/${chargingPointId}`);
  };

  static fetchStations = async () => {
    apiService.get(`/station`);
  };

  static returnAdmin = async () => {
    try {
      const res = await apiService.get(`/users/isadmin`);
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
