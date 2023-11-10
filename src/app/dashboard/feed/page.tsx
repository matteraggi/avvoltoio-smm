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

const page = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [feedArray, setFeedArray] = useState<ISquealDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { post, setPost } = useContext(PostContext);
  const [pageNum, setPageNum] = useState(0);
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
    baseUrl + `api/client-feed/${clients.login}/?page=0&size=${size}`;

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
          setPageNum((pageNum) => (pageNum = 1));
        } else {
          setFeedArray((feedArray) => [...feedArray, ...data]);
          setPageNum((pageNum) => pageNum + 1);
        }
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
        console.log(data);

        feedArray.map((feed) => {
          if (feed?.squeal?._id === tempId.current) {
            reactedSqueal = feed;
          }
        });

        //agiungo alle reazioni dello squeal a cui abbiamo reagito quella che abbiamo cliccato

        //prendo la reazione attiva
        let cr = reactedSqueal?.reactions?.find(
          (i: any) => i.reaction === reactedSqueal?.active_reaction
        );

        //cosa fare con la vecchia reazione
        if (reactedSqueal?.active_reaction) {
          if (cr?.number) {
            cr.number--;
            if (cr.number <= 0) {
              reactedSqueal?.reactions?.splice(
                reactedSqueal?.reactions.indexOf(cr)
              );
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

        console.log(reactedSqueal);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*useEffect(() => {
    setFeedArray([]);
    setPageNum(0);
    loadContent(firstUrl);
  }, [seed]);*/

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [isLoading]);

  useEffect(() => {
    setFeedArray([]);
    setPageNum(0);
    loadContent(firstUrl);
  }, [clients]);

  useEffect(() => {
    setFeedArray([]);
    setPageNum(0);
    loadContent(firstUrl);
    console.log(post);
  }, [post]);

  useEffect(() => {
    setFeedArray([]);
    loadContent(firstUrl);
  }, []);

  /*
​
_id: "654b667cd4b06b37a9e7e609"
​
emoji: "cold"
​
positive: true
​
squeal_id: "6549276494aa1b0092d81119"
​
user_id: "653fdd2244773d2bc975740d"
​
username: "VipUser" 

*/

  const loadMore = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (!(scrollTop + clientHeight >= scrollHeight) || isLoading) {
      return;
    }
    loadContent(standardUrl);
  };

  function timeDifference(current, previous) {
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

              return (
                <div
                  key={feed?.squeal?._id}
                  className="p-3 w-8/12 bg-slate-200 shadow-lg shadow-grey-500/50 rounded-xl border-2 border-black mb-6"
                >
                  <div className="flex justify-between border-slate-500 border-x-0 border border-t-0 border-b-2">
                    <h3>{feed.userName}</h3>
                    <p>
                      {timeDifference(currentDate, feed?.squeal?.timestamp)}
                    </p>

                    <p className="italic">{feed?.views?.number} Views</p>
                  </div>
                  <div className="mt-6">
                    {feed?.squeal?.img ? feed?.squeal?.img : null}
                    <p>{feed?.squeal?.body}</p>
                  </div>
                  <div className="flex justify-between mt-6 items-end">
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
                            //!
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

/*
ritorna la nuova reaction. 

Struttura:

Carico la pagina, che mi restituisce gli array con tutti gli squeal. 
Ogni squeal ha anche le reaction, contenute in un array (usestate).
Io mostro subito l'array con le reaction. 

Come faccio a mostrare anche la reaction appena aggiunta?
Potrei mostrare solo una roba a parte solo se non esistessero emoji ripetute. 
Ma visto che in ogni caso dovrei comunque, per molte emoji, aggiornare il counter, 
l'unico modo e aggiornare l'array che mi viene restituito e poi aggiornare in uno dei seguenti modi.

Come aggiornare?

1) solo backend ricaricando la pagina (peggiore opzione)

2) aggiornando solo il componente:

- ricaricare solo quella parte di html attraverso jquery e selettore html (errore $)
- ricaricare solo quella parte di html attraverso key e usestate (problema key ripetuta)

*/
