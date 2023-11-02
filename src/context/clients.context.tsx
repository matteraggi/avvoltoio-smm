"use client";

import { createContext, useState } from "react";

const defaultvalue = {
  __v: 0,
  _id: "",
  activated: false,
  activation_key: "",
  authorities: [],
  email: "",
  first_name: null,
  img: [],
  img_content_type: null,
  lang_key: "en",
  last_name: null,
  login: "",
  password: "",
};

export const ClientsContext = createContext({
  clients: defaultvalue,
  setClients: (clients: typeof defaultvalue) => {},
});

export const ClientsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clients, setClients] = useState(defaultvalue);

  return (
    <ClientsContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientsContext.Provider>
  );
};
