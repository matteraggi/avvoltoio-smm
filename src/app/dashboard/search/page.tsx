"use client";

import { baseUrl } from "@/app/shared";
import { ClientsContext } from "@/context/clients.context";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
  const { clients, setClients } = React.useContext(ClientsContext);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [urlInput, setUrlInput] = React.useState<string[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      squealDestination();
    }
  }, [searchQuery]);

  const squealDestination = () => {
    const url =
      baseUrl +
      `api/squeals-destination/smm/` +
      clients.login +
      `?search=${urlInput}`;

    console.log(url);

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
        setSearchResults(data);
        console.log(searchResults);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
        //stampa messaggio di errore
      });
  };

  const handleInput = (e: any) => {
    setSearchQuery(e);
    var eSplit = e.split("");
    if (eSplit[0] === "#") {
      eSplit[0] = "%23";
    }
    e = eSplit.join("");
    setUrlInput(e);

    document.getElementById("list")?.classList.remove("notdisplayed");
  };

  return (
    <>
      <div className="arrow-back">
        <Link href="/dashboard">
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center mt-16">
        <form className="w-6/12">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cerca Profili, Canali,..."
              required
              onChange={(e) => handleInput(e.target.value)}
              value={searchQuery}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-[#4B2CA0] hover:bg-[#391F7F] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
        <div className="w-6/12 h-[600px] overflow-y-scroll bg-white border-2 ">
          {searchQuery.length > 0 ? (
            <>
              {searchResults.map((result, index) => {
                if (result.destination_type === "MESSAGE") {
                  return (
                    <Link
                      href={"/dashboard/feed/" + result.destination}
                      key={index}
                    >
                      <div
                        className="flex justify-between border-solid border-[#4B2CA0] border-4 bg-white mb-3 rounded-lg p-3"
                        key={index}
                      >
                        <h3>{result.destination}</h3>
                        <h4>User</h4>
                      </div>
                    </Link>
                  );
                }
                if (result.destination_type === "PUBLICGROUP") {
                  return (
                    <Link
                      href={"/dashboard/feed/channel/" + result.destination_id}
                      key={index}
                    >
                      <div className="flex justify-between border-solid border-[#4B2CA0] border-4 bg-white mb-3 rounded-lg p-3">
                        <h3>{result.destination}</h3>
                        <h4>Public</h4>
                      </div>
                    </Link>
                  );
                }
                return (
                  <Link
                    href={"/dashboard/feed/channel/" + result.destination_id}
                    key={index}
                  >
                    <div className="flex justify-between border-solid border-[#4B2CA0] border-4 bg-white mb-3 rounded-lg p-3">
                      <h3>{result.destination}</h3>
                      <h4>Private</h4>
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="flex justify-center mt-5">
              <p className="text-[#d1d5db]">Cerca utenti, canali e hashtag!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
