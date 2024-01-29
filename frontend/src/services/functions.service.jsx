import apiService from "./api.service";

const fetchChargingPoint = async (chargingPointId) => {
  apiService.get(`/chargingpoint/${chargingPointId}`);
};

const fetchStations = async () => {
  apiService.get(`/station`);
};

const returnAdmin = async () => {
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

const getUserInfos = async ({ params }) => {
  try {
    const data = await apiService.get(`/users/${params.userId}`);

    return { preloadedUserData: data };
  } catch (error) {
    return null;
  }
};

const getCarInfos = async ({ params }) => {
  try {
    const data = await apiService.get(`/vehicle/${params.carId}`);
    return { preloadedCarData: data };
  } catch (error) {
    return null;
  }
};

export default {
  fetchChargingPoint,
  fetchStations,
  returnAdmin,
  getUserInfos,
  getCarInfos,
};
