"use client";

import { baseUrl } from "@/app/shared";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { ClientsContext } from "@/context/clients.context";
import { useContext, useState, useEffect } from "react";
import { ISquealDTO } from "@/model/squealDTO-model";
import IconHeart from "../../../../../public/IconHeart";
import IconExplodingEmoji from "../../../../../public/IconExplodingEmoji";
import IconColdEmoji from "../../../../../public/IconColdEmoji";
import IconNerdEmoji from "../../../../../public/IconNerdEmoji";
import IconClownEmoji from "../../../../../public/IconClownEmoji";
import IconBoredEmoji from "../../../../../public/IconBoredEmoji";
import CommentsVisual from "@/components/CommentsVisual";
import Link from "next/link";

const SquealId = ({ params }: any) => {
  const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const squeal_id = params.squeal_id;
  const { clients, setClients } = useContext(ClientsContext);
  const [squeal, setSqueal] = useState<ISquealDTO>();

  const getSingleSqueal = () => {
    const url =
      baseUrl + `api/squeal-response/smm/${squeal_id}/${clients.login}`;
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
        setSqueal(data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const url = `data: ${squeal?.squeal?.img_content_type}  ;base64, ${squeal?.squeal?.img}`;

  const words = squeal?.squeal?.body?.split(" ");

  const getIcon = (emoji: string) => {
    switch (emoji) {
      case "heart":
        return <IconHeart />;
      case "exploding":
        return <IconExplodingEmoji />;
      case "cold":
        return <IconColdEmoji />;
      case "nerd":
        return <IconNerdEmoji />;
      case "clown":
        return <IconClownEmoji />;
      case "bored":
        return <IconBoredEmoji />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getSingleSqueal();
  }, []);

  return (
    <>
      <div className="arrow-back">
        <Link href="/dashboard/stats">
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
      <div className="flex justify-center align-top mt-8">
        <div
          key={squeal?.squeal?._id}
          className="p-3 w-8/12 bg-slate-200 shadow-lg shadow-grey-500/50 rounded-xl border-2 border-black mb-6"
        >
          <div className="flex justify-between border-slate-500 border-x-0 border border-t-0 border-b-2">
            <h3>{squeal?.userName}</h3>
            <div className="flex gap-1">
              {squeal?.squeal?.destination?.map((dest, index) => {
                return (
                  <p key={index} className="ml-4 text-neutral-400">
                    {dest.destination}
                  </p>
                );
              })}
            </div>
            <p>{timeDifference(currentDate, squeal?.squeal?.timestamp)}</p>

            <p className="italic">{squeal?.views?.number} Views</p>
          </div>
          <div className="mt-6">
            {squeal?.squeal?.img && <img src={url} />}

            <p>
              {words?.map((word) => {
                return word.match(URL_REGEX) ? (
                  <>
                    <a
                      href={word}
                      target="_blank"
                      className="underline text-[#0000EE]"
                    >
                      {word}
                    </a>{" "}
                  </>
                ) : (
                  word + " "
                );
              })}
            </p>
          </div>
          <div className="flex justify-between mt-6 items-end mb-6">
            <ul className="flex gap-x-3">
              {squeal?.reactions?.map((r: any, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center gap-x-3 bg-white rounded-3xl p-2"
                  >
                    <p className="font-medium text-lg">{r.number}</p>
                    {getIcon(r.reaction)}
                  </li>
                );
              })}
            </ul>
          </div>
          <CommentsVisual
            squeal_id={squeal?.squeal?._id}
            squealDestinations={squeal?.squeal?.destination}
          />
        </div>
      </div>
    </>
  );
};

export default SquealId;
