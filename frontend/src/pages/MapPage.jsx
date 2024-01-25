import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/Map";

const librariesList = ["places"];

// Page qui charge la carte avec les librairies nécessaires
export default function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: librariesList,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
