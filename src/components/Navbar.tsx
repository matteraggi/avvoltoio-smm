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
import { io, Socket } from "socket.io-client";
import { baseUrl } from "@/app/shared";
import notificationSound from "../../public/notification.mp3";
import { NotificationType } from "@/model/notification.model";
import squealerLogo from "/public/squealer-logo.png";
import SquealerImage from "/public/squealerimage.png";
import IconClientsRequests from "../../public/IconClientsRequests";

const Navbar = () => {
  const { popup, setPopup } = useContext(PopupContext);
  const { clients, setClients } = useContext(ClientsContext);
  const { logged, setLogged } = useContext(LoggedContext);
  const { socket, setSocket } = useContext(SocketioContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const [notReadNotification, setNotReadNotification] = useState(0);
  const prevNotification = useRef(notification);

  const socketTemp = useRef(socket);
  useEffect(() => {
    const connect = io("http://localhost:8000");
    socketTemp.current = connect;
    setSocket(connect);
  }, []);
  useEffect(() => {
    socketTemp.current.emit("addUser", clients);
    listenNotification();
    getNotReadNotification();
  }, [socket, clients]);

  useEffect(() => {
    getNotReadNotification();
  }, [popup]);

  const navigation = [
    { name: "Homepage", href: "/", current: false },
    { name: "Dashboard", href: "/dashboard", current: false },
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
        setNotReadNotification(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listenNotification = () => {
    socketTemp.current!.on("getNotification", (data: any) => {
      if (prevNotification.current != data) {
        setNotification(notification.concat(data));

        toast.success("🔔 Nuova notifica!", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });

        /*
        ricevere il messaggio solo se non si è sulla schermata di squealer
        if ( !document.HasFocus() ) {
          const sound = new Audio(notificationSound);
          sound.play();
        }

        se nell'if metto anche il boolean popup potrei non far sentire la notifica quando è aperta la barra delle notifiche
        */

        const sound = new Audio(notificationSound);
        sound.play();
      }
      prevNotification.current = data;
    });
  };

  return (
    <>
      <Disclosure as="nav" className="bg-[#4B2CA0]">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="lg:flex flex-row items-center justify-center sm:items-stretch hidden ">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image
                        src={squealerLogo}
                        alt="squealer_logo"
                        width={50}
                        height={50}
                      />
                    </Link>
                  </div>
                  <div className="sm:ml-12 hidden lg:flex flex-row items-center align-middle justify-center space-x-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-white px-1 py-3 text-lg font-medium hover:border-b-2 hover:border-white"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-x-1/2 -ml-24">
                  <ChooseClient />
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                  <button
                    type="button"
                    className="relative rounded-full text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 popup-button mr-3"
                  >
                    <Link href="/requests">
                      <IconClientsRequests />
                    </Link>
                  </button>
                  <button
                    type="button"
                    className="relative rounded-full text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 popup-button"
                    onClick={handlePopup}
                  >
                    <BellIcon className="h-6 w-6" aria-hidden="true" />

                    {notReadNotification + notification.length > 0 ? (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {notReadNotification + notification.length}
                      </div>
                    ) : null}
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={SquealerImage}
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
            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:underline block rounded-md px-3 py-2 text-base font-medium"
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
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
