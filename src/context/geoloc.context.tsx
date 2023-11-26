"use client";

import { createContext, useState } from "react";
import { IGeolocationCoordinates } from "@/model/geoloc.model";

export const GeolocContext = createContext({
  geoloc: {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    speed: 0,
    heading: 0,
    timestamp: 0,
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
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    speed: 0,
    heading: 0,
    timestamp: 0,
    refresh: false,
  });

  return (
    <GeolocContext.Provider value={{ geoloc, setGeoloc }}>
      {children}
    </GeolocContext.Provider>
  );
};
