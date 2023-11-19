"use client"; // This is a client component 👈🏽

import Link from "next/link";
import { useContext } from "react";
import { ClientsContext } from "../context/clients.context";

const DashboardMain = () => {
  const { clients, setClients } = useContext(ClientsContext);

  return (
    <div className="dashboard">
      <div className="dashboard-atf">
        {clients?.email ? (
          <h2>{clients?.login}</h2>
        ) : (
          <div className="p-3 border-2 border-black">
            <h2>Selezionare Cliente!</h2>
          </div>
        )}
        <h4 className="client-email">
          {clients?.email ? clients?.email : " "}
        </h4>
      </div>
      {clients.email && (
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
      )}
    </div>
  );
};

export default DashboardMain;
