import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

type LartLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

function FeedMap (props: any) {
  const latSqueal = props.lat;
  const lngSqueal = props.lng;
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LartLngLiteral>(
    () => ({ lat: parseFloat(latSqueal), lng: parseFloat(lngSqueal) }),
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

  return (
    <GoogleMap
      zoom={14}
      center={center}
      mapContainerClassName="h-[600px] w-full"
      onLoad={onLoad}
      options={options}
    >
      <MarkerF
        position={{
          lat: parseFloat(latSqueal),
          lng: parseFloat(lngSqueal),
        }}
      />
    </GoogleMap>
  );
};

export default FeedMap;
