"use client";

import { Suspense, lazy } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import React, { useEffect, useState, useContext, useRef } from "react";
import { baseUrl } from "../../shared";
import { ClientsContext } from "../../../context/clients.context";
import CreateSquealForm from "@/components/CreateSquealForm";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import IconHeart from "../../../../public/IconHeart";
import IconBoredEmoji from "../../../../public/IconBoredEmoji";
import IconColdEmoji from "../../../../public/IconColdEmoji";
import IconClownEmoji from "../../../../public/IconClownEmoji";
import IconNerdEmoji from "../../../../public/IconNerdEmoji";
import IconExplodingEmoji from "../../../../public/IconExplodingEmoji";
import { IReactionDTO, ISquealDTO } from "@/model/squealDTO-model";
import Comments from "@/components/Comments";
const FeedMap = lazy(() => import("@/components/FeedMap"));
import { useJsApiLoader } from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";
import { SocketioContext } from "@/context/socketio.context";
import SquealerImage from "/public/squealerimage.png";
import Image from "next/image";

//usestate booleano per mostrare subito il post: useeffect che quando si modifica ricarica i post
//metti in un modo quando posti e in un altro quando ricarichi

const page = () => {
  useJsApiLoader({
    googleMapsApiKey: "AIzaSyDTiBSWt4Ft7tUnZdmrmyZMsFr1MeWzSsM",
  });
  const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const { clients, setClients } = useContext(ClientsContext);
  const [feedArray, setFeedArray] = useState<ISquealDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const tempId = useRef("");
  const firstUpdate = useRef(true);
  const prevClient = useRef("");
  const pageOpening = useRef(true);
  const { socket, setSocket } = useContext(SocketioContext);
  const pageNum = useRef(0);
  const size = 10;
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
  const standardUrl =
    baseUrl +
    `api/client-feed/${clients.login}/?page=${pageNum.current}&size=${size}`;
  const firstUrl =
    baseUrl + `api/client-feed/${clients.login}/?page=0&size=${size}`;

  const loadContent = (url: string) => {
    console.log(url);

    setIsLoading(true);
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
        if (firstUpdate.current) {
          firstUpdate.current = false;
        }
        setFeedArray((feedArray) => [...feedArray, ...data]);
        pageNum.current++;
        console.log(feedArray);
        console.log(feedArray);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        squeal_id: tempId.current,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        //squeal a cui abbiamo reagito
        var reactedSqueal: any;

        feedArray.map((feed) => {
          if (feed?.squeal?._id === tempId.current) {
            reactedSqueal = feed;
          }
        });

        //prendo la reazione attiva
        let cr = reactedSqueal?.reactions?.find(
          (i: any) => i.reaction === reactedSqueal?.active_reaction
        );

        //cosa fare con la vecchia reazione
        if (reactedSqueal?.active_reaction) {
          if (cr?.number) {
            cr.number--;
            if (cr.number <= 0) {
              const index = reactedSqueal?.reactions.indexOf(cr);
              reactedSqueal?.reactions?.splice(index, 1);
            }
          }
          if (data.emoji === "deleted") {
            reactedSqueal.active_reaction = null;

            const triggerChangeId = feedArray.map((feed) => {
              if (feed?.squeal?._id === data.squeal_id) {
                feed!.squeal!._id! = feed!.squeal!._id! + "";
                return feed;
              } else {
                return feed;
              }
            });
            setFeedArray(triggerChangeId);

            return;
          }
        }

        cr = reactedSqueal?.reactions?.find(
          (i: any) => i.reaction === data.emoji
        );

        //cosa fare con la nuova reazione
        if (cr?.number) {
          cr.number++;
        } else {
          const dto: IReactionDTO = {
            number: 1,
            reaction: data.emoji ?? "deleted",
            user: false,
          };
          reactedSqueal?.reactions?.push(dto);
        }
        reactedSqueal!.active_reaction = data.emoji;

        const triggerChangeId = feedArray.map((feed) => {
          if (feed?.squeal?._id === data.squeal_id) {
            feed!.squeal!._id! = feed!.squeal!._id! + "";
            return feed;
          } else {
            return feed;
          }
        });
        setFeedArray(triggerChangeId);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [isLoading]);

  useEffect(() => {
    if (!(pageOpening.current || prevClient.current !== clients.login)) {
      prevClient.current = clients.login;
      return;
    }
    setFeedArray([]);
    pageNum.current = 0;
    loadContent(firstUrl);
    pageOpening.current = false;
    prevClient.current = clients.login;
  }, [clients]);

  const loadMore = () => {
    if (firstUpdate.current) {
      return;
    }
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (!(scrollTop + clientHeight >= scrollHeight) || isLoading) {
      return;
    }
    loadContent(standardUrl);
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

  return (
    <>
      <section className="bg-[#F4F4F4]">
        <div className="arrow-back">
          <Link href="/dashboard">
            <ArrowBackIcon sx={{ fontSize: 50 }} />
          </Link>
        </div>
        {clients.email ? (
          <div className="feed">
            <CreateSquealForm
              feedArray={feedArray}
              setFeedArray={setFeedArray}
            ></CreateSquealForm>

            <span className="mt-6" />
            {feedArray.map((feed) => {
              const currentDate = Date.now();

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

              const url = `data: ${feed.squeal?.img_content_type}  ;base64, ${feed.squeal?.img}`;

              const words = feed.squeal?.body?.split(" ");

              /*window.requestAnimationFrame(() => {
                addMap(feed);
                startRefresh(feed);
              });*/

              return (
                <div
                  key={feed?.squeal?._id}
                  className="p-5 w-1/2 bg-white shadow-lg shadow-grey-500/50 rounded-xl mb-6"
                >
                  <div className="flex justify-between items-center border-slate-500 ">
                    <div className="flex flex-row">
                      <Image
                        className="w-10 h-10 rounded-full mr-3"
                        src={SquealerImage}
                        alt="Rounded avatar"
                        width={50}
                        height={50}
                      />
                      <Link
                        href={"/dashboard/feed/" + feed.userName}
                        className="flex content-center justify-center align-middle"
                      >
                        <h3 className="font-normal text-2xl">
                          @{feed.userName}
                        </h3>
                      </Link>
                    </div>
                    <span className="text-[16px] font-medium inline-flex text-[#B4ACAC]">
                      {timeDifference(currentDate, feed?.squeal?.timestamp)}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {feed?.squeal?.destination?.map((dest, index) => {
                      return (
                        <p
                          key={index}
                          className="mr-4 bg-[#4B2CA0] py-1 px-4 rounded-3xl text-white text-[16px]"
                        >
                          <Link
                            href={
                              "/dashboard/feed/channel/" + dest.destination_id
                            }
                          >
                            {dest.destination}
                          </Link>
                        </p>
                      );
                    })}
                  </div>
                  <div className="mt-6">
                    {!(!feed.squeal?.img || feed.squeal?.img?.length == 0) ? (
                      <Image src={url} alt="iamge" />
                    ) : null}

                    {feed.geoLoc?.latitude && feed.geoLoc.longitude ? (
                      <Suspense>
                        <FeedMap
                          lat={feed.geoLoc.latitude}
                          lng={feed.geoLoc.longitude}
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
                      squeal_id={feed?.squeal?._id}
                      squealDestinations={feed?.squeal?.destination}
                      user_id={feed?.squeal?.user_id}
                      num_comments={feed?.comments_number}
                    />
                    <div className="flex">
                      {feed.squeal!.body!.length > 1 ? (
                        <p className="text-[16px] font-medium inline-flex text-[#B4ACAC]">
                          {feed.squeal?.body?.length} Caratteri
                        </p>
                      ) : (
                        <p className="text-[16px] font-medium inline-flex text-[#B4ACAC]">
                          {feed.squeal?.body?.length} Carattere
                        </p>
                      )}

                      <p className="text-[16px] font-medium inline-flex ml-5 text-[#B4ACAC]">
                        {feed?.views?.number} Views
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
                              if (
                                feed.squeal != undefined &&
                                feed.squeal._id != undefined &&
                                tempId.current != null
                              ) {
                                tempId.current = feed.squeal._id;
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
                      {feed?.reactions?.map((r: any, index) => {
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
              );
            })}
            {isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : null}
          </div>
        ) : (
          <p className="flex justify-center">Scegli un utente</p>
        )}
      </section>
    </>
  );
};

export default page;
