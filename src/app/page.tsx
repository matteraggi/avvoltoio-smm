"use client";
import Navbar from "@/components/Navbar";
import React, { use, useEffect, useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "./shared";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  //dallo user id che ho in localstorage mi prendo il mio account (smm) e displayo le mie info

  const [clientsNumber, setClientsNumber] = useState(0);
  const [myProfile, setMyProfile] = useState<any>({});

  const getClientsNumber = () => {
    const url = baseUrl + "api/smmclients-number";
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
        setClientsNumber(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stats = [
    {
      name: "Email",
      stat: myProfile?.email,
    },
    {
      name: "Numero di clienti",
      stat: clientsNumber,
    },
    {
      name: `Caratteri Rimanenti / ${myProfile?.n_characters?.type}`,
      stat: myProfile?.n_characters?.remainingChars,
    },
  ];

  const myAccountInfo = () => {
    const url = baseUrl + "api/account";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMyProfile(data);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
      });
  };

  useEffect(() => {
    myAccountInfo();
    getClientsNumber();
  }, []);

  return (
    <section>
      <Navbar />
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div className="atf">
        <h1 className="text-black">{myProfile.login}</h1>
      </div>
      <div className="px-48">
        <dl className="mt-10 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">
                {item.name}
              </dt>
              <div className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-[#4B2CA0]">
                  {item.stat}
                </div>
              </div>
            </div>
          ))}
        </dl>
        <div className="pt-12">
          <p className="text-[14px] text-stone-500">
            Benvenuto <strong>{myProfile.login}</strong>! Questa è la
            piattaforma di Squealer dedicata ai Social Media Manager. <br />{" "}
            <br /> Grazie a questa piattaforma potrai svolgere il tuo lavoro in
            modo fluido ed estremamente semplice. Gli strumenti presenti ti
            permetteranno di analizzare le performance del tuo cliente in modo
            automatico, e utilizzare il suo profilo mantenendo comunque un
            livello di sicurezza adeguato per entrambe le parti. <br />
            Come si utilizza la piattaforma? <br /> <br />
            Essa è composta da due parti:
            <br />
            <br />
            1. Homepage: la schermata che stai visualizzando in questo momento.
            Utile a mostrare qualche informazione sul tuo profilo da SMM.
            <br />
            2. Dashboard: la schermata principale, dove potrai prendere il
            controllo dei tuoi clienti e visualizzare le loro performance.
            <br />
            <br />
            Ma per accedere alla Dashboard dovrai prima selezionare il cliente
            che vuoi visualizzare. Per fare questo dovrai utilizzare il Box
            nella parte centrale alta della pagina.
            <br />
            <br />
            Una volta selezionato il cliente potrai accedere a quelle che sono
            le parti dinamiche dell'applicazione. Quindi la Dashboard e le
            Notifiche (nota la campanellina in alto a destra). Passiamo quindi
            alla parte più interesssante: la Dashboard.
            <br />
            <br />
            La Dashboard è composta da 4 sezioni: Post & Feed, Stats, Search e
            New Channel.
            <br />
            <br />
            Post & Feed: qui potrai visualizzare e interagire con i post del tuo
            cliente e potrai pubblicarne di nuovi. Puoi anche vedere il profilo
            di chi ha postato gli Squeal e i canali ai quali appartengono.
            <br />
            <br />
            Stats: qui potrai visualizzare le performance del tuo cliente. Puoi
            visualizzare i dati in modo grafico e tabellare.
            <br />
            <br />
            Search: qui potrai cercare nuovi canali e utenti da visualizzare.
            <br />
            <br />
            New Channel: qui potrai aggiungere un nuovo canale.
          </p>
        </div>
      </div>
    </section>
  );
}
