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
      name: "Numero di clienti",
      stat: clientsNumber,
      previousStat: "70,946",
      change: "12%",
      changeType: "increase",
    },
    {
      name: "Guadagni totali",
      stat: "8231.21€",
      previousStat: "6231.21€",
      change: "31.02%",
      changeType: "increase",
    },
    {
      name: "Reazioni positive totali",
      stat: "1,2M",
      previousStat: "2M",
      change: "40%",
      changeType: "decrease",
    },
  ];

  const [myProfile, setMyProfile] = useState<any>({});

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
      <div className="px-12">
        <dl className="mt-10 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">
                {item.name}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-[#4B2CA0]">
                  {item.stat}
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    from {item.previousStat}
                  </span>
                </div>

                <div
                  className={classNames(
                    item.changeType === "increase"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                    "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {" "}
                    {item.changeType === "increase"
                      ? "Increased"
                      : "Decreased"}{" "}
                    by{" "}
                  </span>
                  {item.change}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
