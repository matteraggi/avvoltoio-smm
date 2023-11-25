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
  login: "scegli-il-cliente",
};

export const ArrayVIPSContext = createContext({
  arrayVIPS: [] as (typeof defaultvalue)[],
  setArrayVIPS: (arrayVIPS: (typeof defaultvalue)[]) => {},
});

export const SquealContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arrayVIPS, setArrayVIPS] = useState<(typeof defaultvalue)[]>([]);

  return (
    <ArrayVIPSContext.Provider value={{ arrayVIPS, setArrayVIPS }}>
      {children}
    </ArrayVIPSContext.Provider>
  );
};
