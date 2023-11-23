"use client";

import { baseUrl } from "@/app/shared";
import { ClientsContext } from "@/context/clients.context";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
  const { clients, setClients } = React.useContext(ClientsContext);

  return <></>;
};

export default page;
