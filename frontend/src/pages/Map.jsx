import { APIProvider, Map } from "@vis.gl/react-google-maps";
import data from "../data-test.json";
import Station from "../components/Station";

export default function MyMap() {
  // const wild = { lat: 44.86943771320005, lng: -0.5651798933208533 };
  const position = { lat: 46.57829080854987, lng: 2.528225829979713 };
  console.info(data);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "90vh" }}>
        <Map
          zoom={5}
          center={position}
          gestureHandling="greedy"
          disableDefaultUI
          /* mapId="baf145c89ada9afb" */
        >
          {data.map((station) => (
            <Station key={station.id_station_itinerance} station={station} />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
