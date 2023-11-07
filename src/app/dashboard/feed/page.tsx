"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../../shared";
import { ClientsContext } from "../../../context/clients.context";
import { PostContext } from "../../../context/post.context";
import CreateSquealForm from "@/components/CreateSquealForm";
import moment from "moment";

const page = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [feedArray, setFeedArray] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { post, setPost } = useContext(PostContext);
  const [pageNum, setPageNum] = useState(0);
  const size = 10;
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

  const loadMore = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (!(scrollTop + clientHeight >= scrollHeight) || isLoading) {
      return;
    }
    loadContent(standardUrl);
  };

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
              return (
                <div
                  key={feed.squeal._id}
                  className="p-3 w-8/12 bg-slate-100 rounded-xl border-2 border-black mb-6"
                >
                  <div className="flex justify-between border-slate-500 border-x-0 border border-t-0 border-b-2">
                    <h3>{feed.userName}</h3>
                    <p>
                      {moment.unix(feed.squeal.timestamp).format("MMM Do YY")}
                    </p>
                  </div>
                  <div className="mt-6">
                    {feed.squeal.image ? feed.squeal.image : null}
                    <p>{feed.squeal.body}</p>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div>{feed.reaction}</div>
                    <p className="italic">{feed.views.number} Views</p>
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
