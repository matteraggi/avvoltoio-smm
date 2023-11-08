"use client";

import { createContext, useState } from "react";
import { ISquealDTO } from "@/model/squealDTO-model";

export const FeedArrayContext = createContext({
  feedArray: [] as ISquealDTO[],
  setFeedArray: (feedArray: ISquealDTO[]) => {},
});

export const SquealContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [feedArray, setFeedArray] = useState<ISquealDTO[]>([]);

  return (
    <FeedArrayContext.Provider value={{ feedArray, setFeedArray }}>
      {children}
    </FeedArrayContext.Provider>
  );
};
