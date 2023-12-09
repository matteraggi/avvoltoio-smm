"use client"; // This is a client component 👈🏽

import { useState, useContext, useEffect, useRef } from "react";
import { PopupContext } from "../context/notify.context";
import { NotificationContext } from "@/context/notification.context";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "@/app/shared";
import page from "@/app/dashboard/page";

const Notification = () => {
  const { popup, setPopup } = useContext(PopupContext);
  const popupclass = document.getElementById("popupclass");
  const { notification, setNotification } = useContext(NotificationContext);
  const { clients, setClients } = useContext(ClientsContext);
  const [dbNotification, setDbNotification] = useState([] as any);
  const pageNum = useRef(0);
  const stopLoad = useRef(false);
  const size = 8;

  function closeModal() {
    setPopup(false);
    popupclass?.classList.toggle("closed");
  }

  function timeDifference(current: any, previous: any) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return "about " + Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return "about " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  const getDbNotification = () => {
    const url =
      baseUrl +
      `api/notification/smm/${clients.login}/?page=${pageNum.current}&size=${size}`;
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
        if (data.length === 0) {
          pageNum.current--;
          stopLoad.current = true;
        } else {
          setDbNotification((dbNotification: any) => [
            ...dbNotification,
            ...data,
          ]);
          stopLoad.current = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadMore = (e: any) => {
    e.preventDefault();
    if (!stopLoad.current) {
      pageNum.current++;
      getDbNotification();
    }
  };

  const currentDate = Date.now();

  const displayNotification = (n: any) => {
    if (n.message) {
      n = n.message;
    }
    let action;
    if (n.type === "MESSAGE") {
      action = "ti ha mandato un messaggio";
    } else if (n.type === "SQUEAL") {
      action = "ha postato uno Squeal";
    } else if (n.type === "COMMENT") {
      action = `ha commentato uno tuo Squeal: "${n.body}"`;
    } else if (n.type === "REACTION") {
      if (n.reaction === "heart") {
        action = "ha reagito con ❤️ al tuo Squeal";
      } else if (n.reaction === "exploding") {
        action = "ha reagito con 🤯 al tuo Squeal";
      } else if (n.reaction === "cold") {
        action = "ha reagito con 🥶 al tuo Squeal";
      } else if (n.reaction === "nerd") {
        action = "ha reagito con 🤓 al tuo Squeal";
      } else if (n.reaction === "clown") {
        action = "ha reagito con 🤡 al tuo Squeal";
      } else if (n.reaction === "bored") {
        action = "ha reagito con 😴 al tuo Squeal";
      } else {
        action = "ha reagito al tuo Squeal";
      }
    } else {
      action = "nuova notifica sconosciuta";
    }
    return (
      <div key={Math.random()} className="flex flex-row justify-between">
        <span>{`${n.username} ${action}`}</span>

        <span className="text-xs font-medium inline-flex items-center px-2.5 py-0.5 me-2">
          <svg
            className="w-2.5 h-2.5 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
          </svg>
          {timeDifference(currentDate, n.timestamp)}
        </span>
        <br />
      </div>
    );
  };

  useEffect(() => {
    getDbNotification();
    if (notification.length > 0) {
      setNotification([]);
    }
    pageNum.current = 0;
  }, []);

  return (
    <>
      <div className="container" onClick={closeModal}></div>
      <div
        className="popupclass overflow-y-auto overscroll-contain"
        id="popupclass"
      >
        <div className="popup-header">
          <h2 className="popup-font">Your Notification</h2>
          <h2 className="popup-font pointer" onClick={closeModal}>
            X
          </h2>
        </div>
        <div className="notification">
          {notification.toReversed().map((n: any) => displayNotification(n))}
          {dbNotification.map((n: any) => displayNotification(n))}
          {dbNotification.length != 0 && !stopLoad.current && (
            <div className="flex">
              <button
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={(e) => loadMore(e)}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
