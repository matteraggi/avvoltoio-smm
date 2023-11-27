import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { GeolocContext } from "@/context/geoloc.context";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

type LartLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const { geoloc, setGeoloc } = useContext(GeolocContext);
  const [marker, setMarker] = useState<LartLngLiteral>();
  const center = useMemo<LartLngLiteral>(
    () => ({ lat: 41.89193, lng: 12.51133 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      streetViewControl: false,
      mapTypeControl: false,
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const onMapClick = (e: any) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setGeoloc({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
      accuracy: 35,
      speed: 0,
      heading: 0,
      timestamp: 0,
      refresh: false,
    });
  };

  return (
    <>
      <GoogleMap
        zoom={6}
        center={center}
        mapContainerClassName="h-[600px] w-full"
        onLoad={onLoad}
        onClick={onMapClick}
        options={options}
      >
        {marker && (
          <MarkerF
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
