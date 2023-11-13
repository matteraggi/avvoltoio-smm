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

const SquealRankByReactionInverse = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [pageNum, setPageNum] = useState(0);
  const size = 10;
  const [squealArray, setSquealArray] = useState<ISquealDTO[]>([]);

  useEffect(() => {
    const url =
      baseUrl +
      `api/squeal-rank-reaction-inverse/${clients.login}/?page=${pageNum}&size=${size}`;

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
        setSquealArray(data);
        /*
            if (squealArray.length === 0) {
              setSquealArray(data);
              setPageNum((pageNum) => (pageNum = 2));
            } else {
              setSquealArray((squealArray) => [...squealArray, ...data]);
              setPageNum((pageNum) => pageNum + 1);
            }*/
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      className="border"
    >
      {squealArray.map((squeal, rank) => {
        const url = `data: ${squeal.squeal?.img_content_type}  ;base64, ${squeal.squeal?.img}`;
        return (
          <section key={squeal.squeal?._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <h2>{rank + 1}</h2>
              </ListItemAvatar>
              <ListItemText
                primary={squeal.squeal?.destination?.map((dest) => {
                  return (
                    <p key={dest.destination_id} className="font-light">
                      {timeDifference(currentDate, squeal.squeal?.timestamp)} -{" "}
                      {dest.destination}
                    </p>
                  );
                })}
                secondary={
                  <React.Fragment>
                    {squeal.squeal?.body?.substring(0, 20) + "..."}

                    {squeal.squeal?.img_content_type === null ? null : (
                      <img alt={squeal.userName} src={url} width={50} />
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </section>
        );
      })}
    </List>
  );
};

export default SquealRankByReactionInverse;
