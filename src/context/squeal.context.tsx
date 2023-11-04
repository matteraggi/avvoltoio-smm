"use client";

import { createContext, useState } from "react";

export const SquealContext = createContext({
    dest: "",
    setDest: (dest: string) => {},
    body: "",
    setBody: (body: string) => {}
  });

export const SquealContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dest, setDest] = useState("");
  const [body, setBody] = useState("");

  return (
    <SquealContext.Provider value={{ dest, setDest, body, setBody}}>
      {children}
    </SquealContext.Provider>
  );
};
