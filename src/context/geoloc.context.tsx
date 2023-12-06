"use client";

import { createContext, useState } from "react";
import { IGeolocationCoordinates } from "@/model/geoloc.model";

export const GeolocContext = createContext({
  geoloc: {
    latitude: 0 || null,
    longitude: 0 || null,
    accuracy: 0 || null,
    speed: 0 || null,
    heading: 0 || null,
    timestamp: 0 || null,
    refresh: false,
  } as IGeolocationCoordinates,
  setGeoloc: (geoloc: IGeolocationCoordinates) => {},
});

export const GeolocContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [geoloc, setGeoloc] = useState<IGeolocationCoordinates>({
    latitude: null,
    longitude: null,
    accuracy: null,
    speed: null,
    heading: null,
    timestamp: null,
    refresh: false,
  });

  return (
    <GeolocContext.Provider value={{ geoloc, setGeoloc }}>
      {children}
    </GeolocContext.Provider>
  );
};
