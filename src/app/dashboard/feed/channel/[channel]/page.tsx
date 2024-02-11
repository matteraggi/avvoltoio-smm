"use client";

import { baseUrl } from "@/app/shared";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { Suspense, useRef } from "react";
import { ClientsContext } from "@/context/clients.context";
import { useContext, useState, useEffect } from "react";
import { IReactionDTO, ISquealDTO } from "@/model/squealDTO-model";
import IconHeart from "../../../../../../public/IconHeart";
import IconExplodingEmoji from "../../../../../../public/IconExplodingEmoji";
import IconColdEmoji from "../../../../../../public/IconColdEmoji";
import IconNerdEmoji from "../../../../../../public/IconNerdEmoji";
import IconClownEmoji from "../../../../../../public/IconClownEmoji";
import IconBoredEmoji from "../../../../../../public/IconBoredEmoji";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Comments from "@/components/Comments";
import AddUserToChannel from "@/components/AddUserToChannel";
import { useJsApiLoader } from "@react-google-maps/api";
import FeedMap from "@/components/FeedMap";
import ViewSubscribers from "@/components/ViewSubscribers";

const Channel = ({ params }: any) => {
  useJsApiLoader({
    googleMapsApiKey: "AIzaSyDTiBSWt4Ft7tUnZdmrmyZMsFr1MeWzSsM",
  });
  const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const channel_id = params.channel;
  const { clients, setClients } = useContext(ClientsContext);
  const [feedArray, setFeedArray] = useState<ISquealDTO[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [channelObj, setChannelObj] = useState<any>();
  const [iAmSubbed, setIAmSubbed] = useState(false);
  const tempId = useRef("");
  const firstUpdate = useRef(true);
  const pageOpening = useRef(true);
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

  const getChannelById = () => {
    const url = baseUrl + `api/channels/smm/${channel_id}/${clients.login}`;

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
        setChannelObj(data.channel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSubbedOrNot = () => {
    const url = baseUrl + `api/channel/subbed/${channel_id}/${clients.login}`;

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
        setIAmSubbed(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const standardUrl =
    baseUrl +
    `api/squeal-by-channel/smm/${channel_id}/?page=${pageNum.current}&size=${size}`;
  const firstUrl =
    baseUrl + `api/squeal-by-channel/smm/${channel_id}/?page=0&size=${size}`;

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
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const subscribeChannel = () => {
    const url =
      baseUrl + `api/channel-users/smm/${channel_id}/${clients.login}`;
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unsubscribeChannel = () => {
    const url =
      baseUrl + `api/channel-users/smm/${channel_id}/${clients.login}`;
    fetch(url, {
      method: "DELETE",
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
      })
      .catch((error) => {
        console.log(error);
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
        console.log(error);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [isLoading]);

  useEffect(() => {
    getChannelById();
    if (!pageOpening.current) {
      return;
    }
    setFeedArray([]);
    pageNum.current = 0;
    loadContent(firstUrl);
    pageOpening.current = false;
    getSubbedOrNot();
  }, []);

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
      <section>
        <div className="arrow-back pointer">
          <ArrowBackIcon sx={{ fontSize: 50 }} onClick={() => router.back()} />
        </div>
        {clients.email ? (
          <div className="feed">
            <div className="flex flex-col w-1/2 p-3 border-4 border-[#4B2CA0] rounded-xl bg-white">
              <div className="flex flex-row justify-between">
                <h1 className="main-card-header">
                  {channelObj?.name.slice(1)}
                </h1>
                <ViewSubscribers channel_id={channel_id} />
                <p className="mt-6">{channelObj?.type}</p>
              </div>

              <div className="flex flex-row gap-2">
                {iAmSubbed ? (
                  <button
                    className="mt-2 w-fit bg-red-600 rounded-xl px-2 py-1 text-white text-[16px]"
                    onClick={unsubscribeChannel}
                  >
                    Disiscriviti
                  </button>
                ) : (
                  <button
                    className="mt-2 w-fit bg-green-600 rounded-xl px-2 py-1 text-white text-[16px]"
                    onClick={subscribeChannel}
                  >
                    Iscriviti
                  </button>
                )}
                <AddUserToChannel channel_id={channel_id} />
              </div>
            </div>

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

              return (
                <div
                  key={feed?.squeal?._id}
                  className="p-5 w-1/2 bg-white shadow-lg shadow-grey-500/50 rounded-xl mb-6"
                >
                  <div className="flex justify-between items-center border-slate-500 ">
                    <div className="flex flex-row">
                      <img
                        className="w-10 h-10 rounded-full mr-3"
                        src="/squealerimage.png"
                        alt="Rounded avatar"
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
                      <img src={url} />
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
            {isLoading && <p>Loading...</p>}
          </div>
        ) : (
          <p className="flex justify-center">Scegli un utente</p>
        )}
      </section>
    </>
  );
};

export default Channel;
