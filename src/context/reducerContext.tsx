"use client";

import { createContext, useReducer } from "react";

export const ReducerContext = createContext({
  reducerValue: 0,
  forceUpdate: () => {},
});

export const SquealContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <ReducerContext.Provider value={{ reducerValue, forceUpdate }}>
      {children}
    </ReducerContext.Provider>
  );
};
