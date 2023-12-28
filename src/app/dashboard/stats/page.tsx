"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "@/app/shared";
import SquealRankByReaction from "@/components/SquealRankByReaction";
import SquealRankByReactionInverse from "@/components/SquealRankByReactionInverse";
import SquealRankByCommentsInverse from "@/components/SquealRankByCommentsInverse";
import SquealRankByComments from "@/components/SquealRankByComments";
import SquealRankByViews from "@/components/SquealRankByViews";
import SquealRankByViewsInverse from "@/components/SquealRankByViewsInverse";
import SquealRankByPositive from "@/components/SquealRankByPositive";
import SquealRankByNegative from "@/components/SquealRankByNegative";
import SquealRankByPosNegRateo from "@/components/SquealRankByPosNegRateo";
import ChartSquealTime from "@/components/ChartSquealTime";
import SquealRankByPosNegRateoInverse from "@/components/SqeualRankByPosNegRateoInverse";

interface charsType {
  remainingChars: number;
  type: string;
}

const page = () => {
  const [squealNumber, setSquealNumber] = useState(0);
  const { clients, setClients } = useContext(ClientsContext);
  const [remainingChars, setRemainingChars] = useState<charsType>({
    remainingChars: 0,
    type: "",
  });

  const countSqueal = () => {
    const url = baseUrl + "api/squeal-made-by-user-count/" + clients.login;

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
        setSquealNumber(data);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
      });
  };

  const getRemainingChars = () => {
    const url = baseUrl + "api/client-chars/" + clients.login;

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
        setRemainingChars({
          remainingChars: data.remainingChars,
          type: data.type,
        });
      })
      .catch((error) => {
        console.log("Authorization failed: " + error.message);
        //stampa messaggio di errore
      });
  };

  const charsStyleName = (style: string | undefined) => {
    if (style === "DAY") {
      return " del giorno";
    } else if (style === "WEEK") {
      return " della settimana";
    } else if (style === "MONTH") {
      return " del mese";
    }
  };

  useEffect(() => {
    countSqueal();
    getRemainingChars();
  }, [clients]);

  if (typeof window !== "undefined") {
    if (localStorage.getItem("id_token") === null) {
      return (
        <div>
          <Link href="/login">
            <p>Non sei Loggato. Clicca qui per fare Log In</p>
          </Link>
        </div>
      );
    }
  }

  return (
    <>
      <div className="arrow-back">
        <Link href="/dashboard">
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
      {squealNumber === 0 ? (
        <h2>Ancora nessuno Squeal</h2>
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-black mb-3">{clients.login} Stats</h1>
            <p>Numero di Squeal: {squealNumber}</p>
            <p>
              Caratteri rimanenti{charsStyleName(remainingChars?.type)}:{" "}
              {remainingChars?.remainingChars}
            </p>
            <div className="flex gap-16">
              <SquealRankByReaction />
              <SquealRankByReactionInverse />
            </div>
            <div className="flex gap-16 mt-5">
              <SquealRankByComments />
              <SquealRankByCommentsInverse />
            </div>
            <div className="flex gap-16 mt-5">
              <SquealRankByViews />
              <SquealRankByViewsInverse />
            </div>
            <div className="flex gap-16 mt-5">
              <SquealRankByPositive />
              <SquealRankByNegative />
            </div>
            <div className="flex gap-16 mt-5">
              <SquealRankByPosNegRateo />
              <SquealRankByPosNegRateoInverse />
            </div>
          </div>
          <ChartSquealTime />
        </div>
      )}
    </>
  );
};

export default page;
