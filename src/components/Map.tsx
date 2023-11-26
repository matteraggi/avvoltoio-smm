import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GeolocContext } from "@/context/geoloc.context";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type LartLngLiteral = google.maps.LatLngLiteral;

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const { geoloc, setGeoloc } = useContext(GeolocContext);
  const [marker, setMarker] = useState<LartLngLiteral>();
  const center = useMemo<LartLngLiteral>(
    () => ({ lat: 41.89193, lng: 12.51133 }),
    []
  );

  useEffect(() => {
    console.log("geoloc", geoloc);
  }, [geoloc]);

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const onMapClick = (e: any) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setGeoloc({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDTiBSWt4Ft7tUnZdmrmyZMsFr1MeWzSsM",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        zoom={6}
        center={center}
        mapContainerClassName="h-[600px] w-full"
        onLoad={onLoad}
        onClick={onMapClick}
      >
        {marker && (
          <Marker
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
