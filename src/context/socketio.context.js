"use client";

import { createContext, useState } from "react";

export const SocketioContext = createContext();

export const SocketioContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  return (
    <SocketioContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketioContext.Provider>
  );
};
