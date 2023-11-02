"use client";

import { createContext, useState } from "react";

export const ClientsContext = createContext({
  clients: "",
  setClients: (clients: string) => {},
});

export const ClientsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clients, setClients] = useState("");

  return (
    <ClientsContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientsContext.Provider>
  );
};
