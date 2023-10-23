"use client";

import { createContext, useState } from "react";

type NotifyOrNot = false | true;

export const NotificationContext = createContext({
  popup: false,
  setPopup: (popup: boolean) => {},
});

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popup, setPopup] = useState<NotifyOrNot>(false);

  return (
    <NotificationContext.Provider value={{ popup, setPopup }}>
      {children}
    </NotificationContext.Provider>
  );
};
