"use client";

import { createContext, useState } from "react";

export const SocketioContext = createContext({
  notification: [] as string[],
  setNotification: (notification: string[]) => {},
});

export const NotifyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<string[]>([]);

  return (
    <SocketioContext.Provider value={{ notification, setNotification }}>
      {children}
    </SocketioContext.Provider>
  );
};
