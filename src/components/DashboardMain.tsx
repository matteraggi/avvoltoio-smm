"use client"; // This is a client component 👈🏽

import Link from "next/link";
import { useContext } from "react";
import { ClientsContext } from "../context/clients.context";

const DashboardMain = () => {
  const { clients, setClients } = useContext(ClientsContext);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col h-fit pt-8">
        <div className="atf">
          {clients?.email ? (
            <h2>Dashboard di {clients?.login}</h2>
          ) : (
            <div className="p-3 border-2 border-black">
              <h2>Selezionare Cliente!</h2>
            </div>
          )}
        </div>
        {clients.email && (
          <div className="flex flex-col mt-6">
            <div className="flex">
              <Link href="/dashboard/feed">
                <div className="card card-1 border-4 border-[#4B2CA0] flex-col">
                  <h3 className="text-[50px]">POST & FEED</h3>
                  <p className="text-[16px]">
                    Guarda il feed del tuo cliente e posta per lui
                  </p>
                </div>
              </Link>
              <Link href="/dashboard/stats">
                <div className="cardsm card-4 border-4 border-[#4B2CA0] flex-col">
                  <h3 className="text-[50px]">STATS</h3>
                  <p className="text-[16px]">
                    Consulta le statistiche del tuo cliente
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex">
              <Link href="/dashboard/search">
                <div className="cardsm card-3 border-4 border-[#4B2CA0] flex-col">
                  <h3 className="text-[50px]">SEARCH</h3>
                  <p className="text-[16px] text-center">
                    Cerca utenti e canali che il tuo cliente può seguire
                  </p>
                </div>
              </Link>

              <Link href="/dashboard/channel-new">
                <div className="card card-2 border-4 border-[#4B2CA0] flex-col">
                  <h3 className="text-[50px]">NEW CHANNEL</h3>
                  <p className="text-[16px]">
                    Crea nuovi canali per il tuo cliente
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
