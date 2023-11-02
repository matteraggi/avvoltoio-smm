"use client"; // This is a client component 👈🏽

import Link from "next/link";
import SidebarMobile from "./SidebarMobile";
import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../app/shared";
import { ClientsContext } from "../context/clients.context";

const DashboardMain = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [currentUser, setCurrentUser] = useState<any>();
  const [errorStatus, setErrorStatus] = useState();

  useEffect(() => {
    //ritorna l'array di tutti i clienti di un SMM
    const url = baseUrl + "api/clientuser/" + clients;
    //passo un id di un utente: ritorna il suo oggetto completo
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        setErrorStatus(error);
      });
  }, [clients]);

  console.log(currentUser);

  return (
    <div className="dashboard">
      <SidebarMobile />
      <div className="dashboard-atf">
        <h2>{currentUser?.login}</h2>
        <h4 className="client-email">{currentUser?.email}</h4>
      </div>
      <div className="stats-container">
        <Link href="/dashboard/squeal">
          <div className="card card-1">
            <h3>SQUEAL</h3>
          </div>
        </Link>
        <Link href="/dashboard/feed">
          <div className="card card-1">
            <h3>FEED</h3>
          </div>
        </Link>
        <Link href="/dashboard/trend">
          <div className="card card-1">
            <h3>TREND</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardMain;
