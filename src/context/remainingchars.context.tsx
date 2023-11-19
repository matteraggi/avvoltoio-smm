"use client";

import { createContext, useState } from "react";

type charsType = {
  remainingChars: number;
  type: string;
};

export const RemainingCharsContext = createContext({
  chars: {
    remainingChars: 0,
    type: "",
  },
  setChars: (chars: charsType) => {},
});

export const SquealContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chars, setChars] = useState<charsType>({
    remainingChars: 0,
    type: "",
  });

  return (
    <RemainingCharsContext.Provider value={{ chars, setChars }}>
      {children}
    </RemainingCharsContext.Provider>
  );
};
