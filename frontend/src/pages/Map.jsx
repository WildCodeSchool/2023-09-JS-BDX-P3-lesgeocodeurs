import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

export default function MyMap() {
  const position = { lat: 44.86943771320005, lng: -0.5651798933208533 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "90vh" }}>
        <Map
          zoom={14}
          center={position}
          gestureHandling="greedy"
          disableDefaultUI
          mapId="baf145c89ada9afb"
        >
          <AdvancedMarker position={position}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
