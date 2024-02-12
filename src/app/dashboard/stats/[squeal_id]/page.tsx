"use client";

import { baseUrl } from "@/app/shared";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { Suspense } from "react";
import { ClientsContext } from "@/context/clients.context";
import { useContext, useState, useEffect } from "react";
import { IReactionDTO, ISquealDTO } from "@/model/squealDTO-model";
import IconHeart from "../../../../../public/IconHeart";
import IconExplodingEmoji from "../../../../../public/IconExplodingEmoji";
import IconColdEmoji from "../../../../../public/IconColdEmoji";
import IconNerdEmoji from "../../../../../public/IconNerdEmoji";
import IconClownEmoji from "../../../../../public/IconClownEmoji";
import IconBoredEmoji from "../../../../../public/IconBoredEmoji";
import Link from "next/link";
import FeedMap from "@/components/FeedMap";
import Comments from "@/components/Comments";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Image from "next/image";
import SquealerImage from "/public/squealerimage.png";

const SquealId = ({ params }: any) => {
  const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const squeal_id = params.squeal_id;
  const { clients, setClients } = useContext(ClientsContext);
  const [squeal, setSqueal] = useState<ISquealDTO>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const reactionstypes = [
    {
      name: "heart",
      label: "heart",
      icon: <IconHeart />,
      command: () => {
        addReaction("heart", true);
      },
    },
    {
      name: "exploding",
      label: "exploding",
      icon: <IconExplodingEmoji />,
      command: () => {
        addReaction("exploding", true);
      },
    },
    {
      name: "cold",
      label: "cold",
      icon: <IconColdEmoji />,
      command: () => {
        addReaction("cold", true);
      },
    },
    {
      name: "nerd",
      label: "nerd",
      icon: <IconNerdEmoji />,
      command: () => {
        addReaction("nerd", false);
      },
    },
    {
      name: "clown",
      label: "clown",
      icon: <IconClownEmoji />,
      command: () => {
        addReaction("clown", false);
      },
    },
    {
      name: "bored",
      label: "bored",
      icon: <IconBoredEmoji />,
      command: () => {
        addReaction("bored", false);
      },
    },
  ];

  const addReaction = (emoji: string, positive: boolean) => {
    const url = baseUrl + `api/client-squeal-reaction/create/${clients.login}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
      body: JSON.stringify({
        positive,
        emoji,
        squeal_id: squeal_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        //prendo la reazione attiva
        let cr = squeal?.reactions?.find(
          (i: any) => i.reaction === squeal?.active_reaction
        );

        //cosa fare con la vecchia reazione
        if (squeal?.active_reaction) {
          if (cr?.number) {
            cr.number--;
            if (cr.number <= 0) {
              const index = squeal!.reactions!.indexOf(cr);
              squeal?.reactions?.splice(index, 1);
            }
          }
          if (data.emoji === "deleted") {
            squeal!.active_reaction = null;
            return squeal;
          }
        }

        cr = squeal?.reactions?.find((i: any) => i.reaction === data.emoji);

        //cosa fare con la nuova reazione
        if (cr?.number) {
          cr.number++;
        } else {
          const dto: IReactionDTO = {
            number: 1,
            reaction: data.emoji ?? "deleted",
            user: false,
          };
          squeal?.reactions?.push(dto);
        }
        squeal!.active_reaction = data.emoji;

        squeal!.active_reaction = null;
        return squeal;
      })
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  }, [refresh]);

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
          className="p-5 w-1/2 bg-white shadow-lg shadow-grey-500/50 rounded-xl mb-6"
        >
          <div className="flex justify-between items-center border-slate-500 ">
            <div className="flex flex-row">
              <Image
                className="w-10 h-10 rounded-full mr-3"
                src={SquealerImage}
                alt="Rounded avatar"
              />
              <Link
                href={"/dashboard/feed/" + squeal?.userName}
                className="flex content-center justify-center align-middle"
              >
                <h3 className="font-normal text-2xl">@{squeal?.userName}</h3>
              </Link>
            </div>
            <span className="text-[16px] font-medium inline-flex text-[#B4ACAC]">
              {timeDifference(currentDate, squeal?.squeal?.timestamp)}
            </span>
          </div>
          <div className="flex gap-1 mt-4">
            {squeal?.squeal?.destination?.map((dest, index) => {
              return (
                <p
                  key={index}
                  className="mr-4 bg-[#4B2CA0] py-1 px-4 rounded-3xl text-white text-[16px]"
                >
                  <Link href={"/dashboard/feed/channel/" + dest.destination_id}>
                    {dest.destination}
                  </Link>
                </p>
              );
            })}
          </div>
          <div className="mt-6">
            {!(!squeal?.squeal?.img || squeal.squeal?.img?.length == 0) ? (
              <Image src={url} alt="squealerImage" />
            ) : null}

            {squeal?.geoLoc?.latitude && squeal.geoLoc.longitude ? (
              <Suspense>
                <FeedMap
                  lat={squeal.geoLoc.latitude}
                  lng={squeal.geoLoc.longitude}
                />
              </Suspense>
            ) : null}

            <p className="mt-3">
              {words?.map((word) => {
                return word.match(URL_REGEX) ? (
                  <>
                    <a
                      href={word}
                      key={word}
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
            <Comments
              squeal_id={squeal?.squeal?._id}
              squealDestinations={squeal?.squeal?.destination}
              user_id={squeal?.squeal?.user_id}
              num_comments={squeal?.comments_number}
            />
            <div className="flex">
              {squeal?.squeal!.body!.length != undefined &&
              squeal?.squeal!.body!.length > 1 ? (
                <p className="text-[16px] font-medium inline-flex text-[#B4ACAC]">
                  {squeal?.squeal?.body?.length} Caratteri
                </p>
              ) : (
                <p className="text-[16px] font-medium inline-flex text-[#B4ACAC]">
                  {squeal?.squeal?.body?.length} Carattere
                </p>
              )}

              <p className="text-[16px] font-medium inline-flex ml-5 text-[#B4ACAC]">
                {squeal?.views?.number} Views
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6 items-end mb-6">
            <div className="reactions">
              <Box>
                <SpeedDial
                  ariaLabel="Reaction SpeedDial"
                  icon={<SpeedDialIcon />}
                  direction="right"
                  FabProps={{
                    sx: {
                      bgcolor: "#F4F4F4",
                      color: "#4B2CA0",
                      "&:hover": {
                        bgcolor: "#4B2CA0",
                        color: "#F4F4F4",
                      },
                    },
                  }}
                  //onClose={handleClose}
                  //onOpen={handleOpen}
                  //open={open}
                >
                  {reactionstypes.map((reaction, index) => {
                    function handeClick() {
                      console.log("reaction");
                      if (
                        squeal?.squeal != undefined &&
                        squeal.squeal._id != undefined
                      ) {
                        reaction.command();
                      }
                    }
                    return (
                      <SpeedDialAction
                        key={index}
                        icon={reaction.icon}
                        tooltipTitle={reaction.name}
                        onClick={handeClick}
                        className="w-12 h-12"
                      />
                    );
                  })}
                </SpeedDial>
              </Box>
            </div>

            <ul className="flex gap-x-3">
              {squeal?.reactions?.map((r: any, index) => {
                return (
                  <li
                    key={index}
                    className="relative flex items-center gap-x-3 bg-white rounded-3xl"
                  >
                    {getIcon(r.reaction)}
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#4B2CA0] border-2 border-white rounded-full -bottom-2 -end-2 dark:border-gray-900">
                      {r.number}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SquealId;
