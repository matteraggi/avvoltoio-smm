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
import { ISquealReaction } from "@/model/squeal-reaction.model";
import { ISquealDestination } from "@/model/squeal-destination.model";
import { FeedArrayContext } from "@/context/feedarray.context";

const page = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [feedArray, setFeedArray] = useState<ISquealDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showReactions, setShowReactions] = useState<IReactionDTO[]>([]);
  const { post, setPost } = useContext(PostContext);
  const [pageNum, setPageNum] = useState(0);
  const [currentId, setCurrentId] = useState<string>("");
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
    baseUrl + `api/client-feed/${clients.login}/?page=${pageNum}&size=${size}`;
  const firstUrl =
    baseUrl + `api/client-feed/${clients.login}/?page=0&size=${size}`;

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
    loadContent(firstUrl);
  }, []);

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
        if (feedArray.length === 0) {
          setFeedArray(data);
          setPageNum((pageNum) => (pageNum = 1));
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

  //!problema: accedere allo squeal id in tempo reale per pushare la reazione anche in front end in real time (come devo fare anche per post e commenti)
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
        squeal_id: currentId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        //reazione aggiunta in database, aggiungere anche frontend
        console.log(data);
        const reactedSqueal = feedArray.find((_id) => _id == data.squeal_id);
        reactedSqueal?.reactions?.push(data);

        const myReaction = feedArray.find((user_id) => user_id == data.user_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                          icon={<SpeedDialIcon />}
                          direction="right"
                          //onClose={handleClose}
                          //onOpen={handleOpen}
                          //open={open}
                        >
                          {reactionstypes.map((reaction) => (
                            <SpeedDialAction
                              key={reaction.name}
                              icon={reaction.icon}
                              tooltipTitle={reaction.name}
                              onClick={reaction.command}
                            />
                          ))}
                        </SpeedDial>
                      </Box>
                    </div>

                    <div>
                      {feed?.reactions?.map((r: any) => {
                        return (
                          <div
                            key={r.reaction}
                            className="flex items-center gap-x-3 bg-white rounded-3xl p-2"
                          >
                            <p className="font-medium text-lg">{r.number}</p>
                            {getIcon(r.reaction)}
                          </div>
                        );
                      })}
                    </div>
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
