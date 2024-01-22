import { useLoadScript } from "@react-google-maps/api";
import { useLoaderData } from "react-router-dom";
import Map from "../components/Map";

const librariesList = ["places"];

export default function MapPage() {
  const stations = useLoaderData();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: librariesList,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map stations={stations} />;
}
