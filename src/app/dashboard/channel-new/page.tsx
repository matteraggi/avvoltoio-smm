"use client";

import { baseUrl } from "@/app/shared";
import { ClientsContext } from "@/context/clients.context";
import Link from "next/link";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Switch from "@mui/material/Switch";

const page = () => {
  const { clients, setClients } = React.useContext(ClientsContext);
  const [channelName, setChannelName] = React.useState("");
  const channelNameApi = React.useRef("");
  const channelType = React.useRef("");
  const [checked, setChecked] = React.useState(false);

  const loadContent = (e: any) => {
    e.preventDefault();
    const url = baseUrl + "api/channels/smm/" + clients.login;

    if (checked) {
      channelNameApi.current = channelName;
      channelType.current = "PRIVATEGROUP";
    } else {
      channelNameApi.current = channelName;
      channelType.current = "PUBLICGROUP";
    }

    console.log(channelNameApi.current);
    console.log(channelType.current);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
      body: JSON.stringify({
        channel: {
          name: channelNameApi.current,
          type: channelType.current,
        },
      }),
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

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleInput = (value: string) => {
    setChannelName(value);
  };

  return (
    <>
      <div className="arrow-back">
        <Link href="/dashboard">
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
      <div className="feed">
        <form
          className="bg-slate-300 rounded-xl p-6 w-8/12 flex flex-col gap-5"
          onSubmit={loadContent}
        >
          <p className="text-2xl">Create a new Channel</p>
          <div className="flex gap-3">
            <Switch checked={checked} onChange={handleChange} />
            {checked ? <p>private</p> : <p>public</p>}

            <input
              name="channel-name"
              type="text"
              className="form-control w-1/2"
              placeholder="channel name"
              aria-label="channel name placeholder"
              aria-describedby="basic-addon1"
              onChange={(e) => handleInput(e.target.value)}
              value={channelName}
            />
          </div>
          <button
            type="submit"
            className="w-[150px] items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Crea Canale
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
