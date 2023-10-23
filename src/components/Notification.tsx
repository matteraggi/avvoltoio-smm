"use client"; // This is a client component 👈🏽

import { useContext } from "react";
import { NotificationContext } from "../context/notify.context";

const Notification = () => {
  const { setPopup } = useContext(NotificationContext);
  const popupclass = document.getElementById("popupclass");

  function closeModal() {
    setPopup(false);
    popupclass?.classList.toggle("closed");
  }

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
          <p>Notification</p>
        </div>
      </div>
    </>
  );
};

export default Notification;
