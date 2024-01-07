import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "@/app/shared";
import { ISquealDTO } from "@/model/squealDTO-model";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconPrevPage from "../../public/IconPrevPage";
import IconNextPage from "../../public/IconNextPage";
import Link from "next/link";

const SquealRankByCommentsInverse = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [pageNum, setPageNum] = useState(1);
  const size = 10;
  const [squealArray, setSquealArray] = useState<ISquealDTO[]>([]);
  const endPage = React.useRef(false);
  const maxPage = React.useRef(100);

  const getComments = () => {
    const url =
      baseUrl +
      `api/squeal-rank-comments-inverse/${clients.login}/?page=${pageNum}&size=${size}`;
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
        if (data.length > 0) {
          setSquealArray(data);
        } else {
          setPageNum((pageNum) => pageNum - 1);
          maxPage.current = pageNum - 1;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComments();
  }, [pageNum]);

  useEffect(() => {
    setSquealArray([]);
    setPageNum(1);
    getComments();
  }, [clients]);

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

  const decrementPageNum = () => {
    if (pageNum > 1) {
      setPageNum((pageNum) => pageNum - 1);
    }
  };

  const incrementPageNum = () => {
    if (pageNum < maxPage.current) {
      setPageNum((pageNum) => pageNum + 1);
    }
  };

  return (
    <section id={"2"} className="flex flex-col w-[350px]">
      <h2 className="text-black">Less Commented</h2>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        className="border border-black"
      >
        {squealArray.map((squeal, rank) => {
          const url = `data: ${squeal.squeal?.img_content_type}  ;base64, ${squeal.squeal?.img}`;
          return (
            <div id={squeal.squeal?._id} key={squeal.squeal?._id}>
              <Link href={"/dashboard/stats/" + squeal.squeal?._id}>
                <ListItem alignItems="flex-start" className="gap-4">
                  <ListItemAvatar>
                    <h3 className="text-[22px] text-[#4B2CA0]">
                      {(pageNum - 1) * size + rank + 1}
                    </h3>
                  </ListItemAvatar>
                  <ListItemText
                    primary={squeal.squeal?.body?.substring(0, 60) + "..."}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Link>
            </div>
          );
        })}
      </List>
      <div className="flex justify-center gap-12 mt-2">
        <div onClick={decrementPageNum}>
          <IconPrevPage />
        </div>
        <p className="font-normal">{pageNum}</p>
        <div onClick={incrementPageNum}>
          <IconNextPage />
        </div>
      </div>
    </section>
  );
};

export default SquealRankByCommentsInverse;
