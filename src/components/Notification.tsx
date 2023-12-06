"use client"; // This is a client component 👈🏽

import { useState, useContext, useEffect, useRef } from "react";
import { PopupContext } from "../context/notify.context";
import { SocketioContext } from "@/context/socketio.context";
import { NotificationContext } from "@/context/notification.context";

const Notification = () => {
  const { setPopup } = useContext(PopupContext);
  const popupclass = document.getElementById("popupclass");
  const { socket, setSocket } = useContext(SocketioContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const prevNotification = useRef(notification);

  function closeModal() {
    setPopup(false);
    popupclass?.classList.toggle("closed");
  }

  useEffect(() => {
    socket.on("getNotification", (data: any) => {
      if (prevNotification != data) {
        setNotification((n) => [...n, data]);
      }
      prevNotification.current = data;
    });
  }, [socket]);

  const displayNotification = (n: any) => {
    let action;
    if (n.message.type === "MESSAGE") {
      action = "ti ha mandato un messaggio";
    } else if (n.message.type === "SQUEAL") {
      action = "ha postato uno Squeal";
    } else if (n.message.type === "COMMENT") {
      action = `ha commentato uno tuo Squeal: "${n.message.body}"`;
    } else if (n.message.type === "REACTION") {
      if (n.message.reaction === "heart") {
        action = "ha reagito con ❤️ al tuo Squeal";
      } else if (n.message.reaction === "exploding") {
        action = "ha reagito con 🤯 al tuo Squeal";
      } else if (n.message.reaction === "cold") {
        action = "ha reagito con 🥶 al tuo Squeal";
      } else if (n.message.reaction === "nerd") {
        action = "ha reagito con 🤓 al tuo Squeal";
      } else if (n.message.reaction === "clown") {
        action = "ha reagito con 🤡 al tuo Squeal";
      } else if (n.message.reaction === "bored") {
        action = "ha reagito con 😴 al tuo Squeal";
      } else {
        action = "ha reagito al tuo Squeal";
      }
    } else {
      action = "nuova notifica sconosciuta";
    }
    return (
      <span key={Math.random()}>
        {`${n.message.username} ${action}`}
        <br />
      </span>
    );
  };

  return (
    <>
      <div className="container" onClick={closeModal}></div>
      <div className="popupclass" id="popupclass">
        <div className="popup-header">
          <h2 className="popup-font">Your Notification</h2>
          <h2 className="popup-font pointer" onClick={closeModal}>
            X
          </h2>
        </div>
        <div className="notification">
          {notification.map((n) => displayNotification(n))}
        </div>
      </div>
    </>
  );
};

export default Notification;
