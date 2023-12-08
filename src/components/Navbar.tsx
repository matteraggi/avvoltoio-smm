"use client"; // This is a client component 👈🏽

import Image from "next/image";
import Link from "next/link";
import { Fragment, use, useContext, useEffect, useRef, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Notification from "./Notification";
import { PopupContext } from "../context/notify.context";
import ChooseClient from "./ChooseClient";
import { ClientsContext } from "@/context/clients.context";
import { LoggedContext } from "@/context/logged.context";
import { SocketioContext } from "@/context/socketio.context";
import { NotificationContext } from "@/context/notification.context";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { baseUrl } from "@/app/shared";

const Navbar = () => {
  const { popup, setPopup } = useContext(PopupContext);
  const { clients, setClients } = useContext(ClientsContext);
  const { logged, setLogged } = useContext(LoggedContext);
  const { socket, setSocket } = useContext(SocketioContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const [notReadNotification, setNotReadNotification] = useState(0);
  const prevNotification = useRef(notification);

  const socketTemp = useRef(null);
  useEffect(() => {
    const connect = io("http://localhost:8080");
    socketTemp.current = connect;
    setSocket(connect);
  }, []);
  useEffect(() => {
    socketTemp.current!.emit("addUser", { clients });
    listenNotification();
    getNotReadNotification();
  }, [socket, clients]);

  useEffect(() => {
    getNotReadNotification();
  }, [popup]);

  const navigation = [
    { name: "HOME", href: "/", current: false },
    { name: "DASHBOARD", href: "/dashboard", current: false },
    { name: "TREND", href: "/trend", current: false },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handlePopup = () => {
    setPopup(!popup);
  };

  const checkout =
    typeof window !== "undefined" ? localStorage.getItem("id_token") : null;

  const logOut = () => {
    localStorage.clear();
    setClients({
      __v: 0,
      _id: "",
      activated: false,
      activation_key: "",
      authorities: [],
      email: "",
      first_name: null,
      img: [],
      img_content_type: null,
      lang_key: "en",
      last_name: null,
      login: "scegli-il-cliente",
    });
    setLogged(Math.random());
  };

  const getNotReadNotification = () => {
    const url = baseUrl + `api/notification/notread/${clients.login}`;

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
        console.log(data);
        setNotReadNotification(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listenNotification = () => {
    socketTemp.current!.on("getNotification", (data: any) => {
      if (prevNotification.current != data) {
        setNotification((n) => n.concat(data));

        toast.success("🔔 Nuova notifica!", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      }
      prevNotification.current = data;
    });
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image
                        src="/squealer-logo.png"
                        alt="squealer_logo"
                        className="logo-navbar"
                        width="50"
                        height="50"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block items-center justify-center">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-lg font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <ChooseClient />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 popup-button"
                    onClick={handlePopup}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only"></span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    <p>{notReadNotification + notification.length}</p>
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="immagine profilo"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            href="/profile"
                            className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                          >
                            Il Mio Profilo
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            href="/login"
                            className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                            onClick={logOut}
                          >
                            Log Out
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
            {popup ? <Notification /> : ""}
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
