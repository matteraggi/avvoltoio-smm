"use client"; // This is a client component 👈🏽

import { useState, useContext, useEffect, useRef } from "react";
import { PopupContext } from "../context/notify.context";
import { NotificationContext } from "@/context/notification.context";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "@/app/shared";

const Notification = () => {
  const { popup, setPopup } = useContext(PopupContext);
  const popupclass = document.getElementById("popupclass");
  const { notification, setNotification } = useContext(NotificationContext);
  const { clients, setClients } = useContext(ClientsContext);
  const [dbNotification, setDbNotification] = useState([] as any);

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
      baseUrl + `api/notification/smm/${clients.login}/?page=0&size=25`;

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
        setDbNotification((dbNotification: any) => [
          ...dbNotification,
          ...data,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <>
        <div className="flex flex-row justify-between">
          <span key={Math.random()}>{`${n.username} ${action}`}</span>
          <p className="text-[12px]">
            {" "}
            | {timeDifference(currentDate, n.timestamp)}
          </p>
        </div>
        <br />
      </>
    );
  };

  useEffect(() => {
    getDbNotification();
    if (notification.length > 0) {
      setNotification([]);
    }
  }, []);

  return (
    <>
      <div className="container" onClick={closeModal}></div>
      <div className="popupclass overflow-y-scroll" id="popupclass">
        <div className="popup-header">
          <h2 className="popup-font">Your Notification</h2>
          <h2 className="popup-font pointer" onClick={closeModal}>
            X
          </h2>
        </div>
        <div className="notification">
          {notification.toReversed().map((n: any) => displayNotification(n))}
          {dbNotification.map((n: any) => displayNotification(n))}
        </div>
      </div>
    </>
  );
};

export default Notification;
