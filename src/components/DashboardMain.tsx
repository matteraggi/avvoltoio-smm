"use client"; // This is a client component 👈🏽

import Link from "next/link";
import SidebarMobile from "./SidebarMobile";
import { addSMM } from "../app/service";
import { useState, useEffect } from "react";
import { baseUrl } from "../app/shared";

const DashboardMain = () => {
  const [errorStatus, setErrorStatus] = useState();

  useEffect(() => {
    //ritorna l'array di tutti i clienti di un SMM
    //usarla non al caricamento della pagina ma quando clicchiamo un determinato elemento della pagina (e gestione http status)
    const id = localStorage.getItem("id");
    const url = baseUrl + "api/ancora-da-fare/" + id;
    //arrayVIPS.current =
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
      .then((data) => {})
      .catch((error) => {
        setErrorStatus(error);
      });
  }, []);

  if (errorStatus == 403) {
    return (
      <div className="dashboard">
        <p>
          Non hai i diritti per accedere a questa sezione ✋🏻😡 <br /> Fai{" "}
          <Link href="/login" className="link">
            Log In
          </Link>{" "}
          con il tuo account da SMM.
          {/* O decidere semplicemente di reindirizzare */}
        </p>
      </div>
    );
  } else if (errorStatus == 500) {
    return (
      <aside className="sidebar">
        <p>Ehhh boh, errore sconosciuto 😶‍🌫️</p>
      </aside>
    );
  } else {
    return (
      <div className="dashboard">
        <SidebarMobile />
        <div>
          <h2>Maurizio Benazzi</h2>
        </div>
        <button onClick={addSMM}>add a SMM!! </button>
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
  }
};

export default DashboardMain;
