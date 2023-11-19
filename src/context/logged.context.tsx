"use client";

import { createContext, useState } from "react";

export const LoggedContext = createContext({
  logged: 0,
  setLogged: (logged: number) => {},
});

export const SquealContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [logged, setLogged] = useState(0);

  return (
    <LoggedContext.Provider value={{ logged, setLogged }}>
      {children}
    </LoggedContext.Provider>
  );
};
