"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import React, { useEffect, useState, useContext, useRef } from "react";
import { baseUrl } from "../../shared";
import { ClientsContext } from "../../../context/clients.context";
import { PostContext } from "../../../context/post.context";
import CreateSquealForm from "@/components/CreateSquealForm";
import Box from "@mui/material/Box";
import SpeedDial, { SpeedDialProps } from "@mui/material/SpeedDial";
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

const page = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [feedArray, setFeedArray] = useState<ISquealDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { post, setPost } = useContext(PostContext);
  const [pageNum, setPageNum] = useState(1);
  const tempId = useRef("");
  const size = 5;
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
    baseUrl + `api/client-feed/${clients.login}/?page=${pageNum}&size=${size}`;
  const firstUrl =
    baseUrl + `api/client-feed/${clients.login}/?page=1&size=${size}`;

  const loadContent = (url: string) => {
    console.log(url);

    setIsLoading(true);
    //!dopo un pò che carica la pagina non carica più nulla
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
        if (feedArray.length === 0) {
          setFeedArray(data);
          setPageNum((pageNum) => (pageNum = 2));
        } else {
          setFeedArray((feedArray) => [...feedArray, ...data]);
          setPageNum((pageNum) => pageNum + 1);
        }
        console.log(feedArray);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getResponses = () => {
    const url =
      baseUrl + `api/squeal-response/smm/${tempId.current}/${clients.login}`;

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
        return response.json();
      })
      .then((data) => {})
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
        //non va quando ci sono più emoji e io tolgo completamente quella che avevo messo io e non ero stato l'ultimo a metterla (toglie tutto)

        //prendo la reazione attuale (null se data.emoji non esiste, quindi se l'emoji che abbiamo cliccato era quella attiva prima)
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

        //aggiorno lo squeal giusto
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
    setFeedArray([]);
    setPageNum(1);
    loadContent(firstUrl);
  }, [clients]);

  useEffect(() => {
    setFeedArray([]);
    setPageNum(1);
    loadContent(firstUrl);
    console.log(post);
  }, [post]);

  useEffect(() => {
    setFeedArray([]);
    loadContent(firstUrl);
  }, []);

  const loadMore = () => {
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
      {clients.login ? (
        <section>
          <div className="arrow-back">
            <Link href="/dashboard">
              <ArrowBackIcon sx={{ fontSize: 50 }} />
            </Link>
          </div>
          <div className="feed">
            <h1 className="main-card-header">Feed</h1>

            <CreateSquealForm></CreateSquealForm>

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

              return (
                <div
                  key={feed?.squeal?._id}
                  className="p-3 w-8/12 bg-slate-200 shadow-lg shadow-grey-500/50 rounded-xl border-2 border-black mb-6"
                >
                  <div className="flex justify-between border-slate-500 border-x-0 border border-t-0 border-b-2">
                    <div className="flex">
                      <h3>{feed.userName}</h3>
                      {feed?.squeal?.destination?.map((dest, index) => {
                        return (
                          <h4 key={index} className="ml-4 text-neutral-400">
                            {dest.destination}
                          </h4>
                        );
                      })}
                    </div>
                    <p>
                      {timeDifference(currentDate, feed?.squeal?.timestamp)}
                    </p>

                    <p className="italic">{feed?.views?.number} Views</p>
                  </div>
                  <div className="mt-6">
                    {feed.squeal?.img && <img src={url} />}

                    <p>{feed?.squeal?.body}</p>
                  </div>
                  <div className="flex justify-between mt-6 items-end mb-6">
                    <div className="reactions">
                      <Box>
                        <SpeedDial
                          ariaLabel="Reaction SpeedDial"
                          icon={<SpeedDialIcon className="text-black" />}
                          direction="right"
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
                            className="flex items-center gap-x-3 bg-white rounded-3xl p-2"
                          >
                            <p className="font-medium text-lg">{r.number}</p>
                            {getIcon(r.reaction)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <Comments
                    squeal_id={feed?.squeal?._id}
                    squealDestinations={feed?.squeal?.destination}
                  />
                </div>
              );
            })}
            {isLoading && <p>Loading...</p>}
          </div>
        </section>
      ) : (
        <p>Scegli un utente</p>
      )}
    </>
  );
};

export default page;
