"use client";
import Navbar from "@/components/Navbar";
import React, { use, useEffect } from "react";
import { baseUrl } from "../shared";

const page = () => {
  const [requests, setRequests] = React.useState<any[]>([]);
  const [clicked, setClicked] = React.useState(false);
  const stopLoad = React.useRef(false);
  const size = 8;
  const pageNum = React.useRef(0);

  const getDbNotification = () => {
    const url =
      baseUrl + `api/notification/?page=${pageNum.current}&size=${size}`;
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
          setRequests((requests: any) => [...requests, ...data]);
          stopLoad.current = false;
        }
        console.log(data);
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

  const currentDate = Date.now();

  const displayNotification = (n: any) => {
    if (n.message) {
      n = n.message;
    }
    let action;
    if (n.type === "MESSAGE") {
      action = "ti ha mandato un messaggio";
    } else if (n.type === "SMM") {
      action = "vuole diventare tuo cliente";
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

    const addClient = (clientUsername: string) => {
      const url = baseUrl + `api/account/add-client/?client=${clientUsername}`;
      console.log(url);

      fetch(url, {
        method: "POST",
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
          setClicked(true);
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          alert("Hai già accettato questa richiesta!");
          console.log(error);
        });
    };
    return (
      <div>
        {action.length > 1 && (
          <div
            key={Math.random()}
            className="flex flex-row justify-between p-2 bg-white rounded-xl"
          >
            <span className="">{`${n.username} ${action}`}</span>
            <p className="text-[12px]">
              {n.type === "SMM" && (
                <button
                  className={
                    clicked
                      ? "mx-4 rounded bg-green-700 text-white font-bold p-1"
                      : "mx-4 rounded bg-red-700 text-white font-bold p-1"
                  }
                  onClick={() => addClient(n.username)}
                >
                  {clicked ? "Richiesta Accettata!" : "Accetta"}
                </button>
              )}
              {timeDifference(currentDate, n.timestamp)}
            </p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getDbNotification();
  }, []);

  return (
    <section>
      <Navbar />
      <div className="flex justify-center align-middle w-full">
        <div className="flex flex-col justify-center align-middle w-3/5">
          <h1 className="text-black text-center">Richieste</h1>
          {requests.length === 0 ? (
            <p className="text-center">Non hai nessuna richiesta :(</p>
          ) : (
            <div className="text-center border-black border-2 rounded h-[700px] overflow-y-scroll">
              {requests.map((n: any) => displayNotification(n))}
              {requests.length != 0 && !stopLoad.current && (
                <div className="flex justify-center">
                  <button
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={(e) => loadMore(e)}
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
