"use client";

import { createContext, useState } from "react";

type NotifyOrNot = false | true;

export const PopupContext = createContext({
  popup: false,
  setPopup: (popup: boolean) => {},
});

export const PopupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popup, setPopup] = useState<NotifyOrNot>(false);

  return (
    <PopupContext.Provider value={{ popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  );
};
