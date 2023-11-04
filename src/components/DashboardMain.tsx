"use client"; // This is a client component 👈🏽

import Link from "next/link";
import SidebarMobile from "./SidebarMobile";
import { useEffect, useState, useContext } from "react";
import { ClientsContext } from "../context/clients.context";

const DashboardMain = () => {
  const { clients, setClients } = useContext(ClientsContext);

  return (
    <div className="dashboard">
      <SidebarMobile />
      <div className="dashboard-atf">
        <h2>{clients?.login ? clients?.login : "Selezionare Cliente 🤬"}</h2>
        <h4 className="client-email">
          {clients?.email ? clients?.email : "mail cliente"}
        </h4>
      </div>
      <div className="stats-container">
        <Link href="/dashboard/feed">
          <div className="card card-1">
            <h3>POST & FEED</h3>
          </div>
        </Link>
        <Link href="/dashboard/stats">
          <div className="card card-1">
            <h3>CLIENT STATS</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardMain;
