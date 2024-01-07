"use client";

import { Fragment, useEffect, useState, useContext, useReducer } from "react";
import { baseUrl } from "../app/shared";
import { ClientsContext } from "../context/clients.context";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { LoggedContext } from "@/context/logged.context";

const ChooseClient = () => {
  const [arrayVIPS, setArrayVIPS] = useState<any[]>([]);
  const { clients, setClients } = useContext(ClientsContext);
  const { logged, setLogged } = useContext(LoggedContext);

  //const checkout = typeof window !== "undefined" ? localStorage.getItem("id_token") : null;

  const getId = () => {
    const url = baseUrl + "api/get-id/smm";
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
        localStorage.setItem("user_id", data._id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getClients = () => {
    getId();
    //ritorna l'array di tutti i clienti di un SMM
    const url = baseUrl + "api/smmclients/" + localStorage.getItem("user_id");
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
        setArrayVIPS(data);
        console.log("array aggiornato");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  const url = `data: ${clients.img_content_type}  ;base64, ${clients.img}`;

  useEffect(() => {
    getClients();
  }, [logged]);

  return (
    <div>
      <Listbox value={clients} onChange={setClients}>
        {({ open }) => (
          <>
            <div className="relative w-50" onClick={getClients}>
              <Listbox.Button className="relative w-52 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  {clients.img_content_type ? (
                    <img src={url} />
                  ) : (
                    <img
                      src="/squealerimage.png"
                      alt=""
                      className="h-5 w-5 flex-shrink-0 rounded-full"
                    />
                  )}

                  <span className="ml-3 block truncate">{clients.login}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-52 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {arrayVIPS.map((vip) => {
                    return (
                      <Listbox.Option
                        key={vip._id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-[#4B2CA0] text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9 w-52"
                          )
                        }
                        value={vip}
                      >
                        {({ selected, active }) => (
                          <section className="w-50">
                            <div className="flex items-center w-50">
                              {vip.img_content_type ? (
                                <img
                                  src={vip.img}
                                  alt=""
                                  className="h-5 w-5 flex-shrink-0 rounded-full"
                                />
                              ) : (
                                <img
                                  src="/squealerimage.png"
                                  alt=""
                                  className="h-5 w-5 flex-shrink-0 rounded-full"
                                />
                              )}

                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {vip.login}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4 w-50"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </section>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default ChooseClient;
