"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../../shared";
import { ClientsContext } from "../../../context/clients.context";
import CreateSquealForm from "@/components/CreateSquealForm";

const page = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const [feedArray, setFeedArray] = useState([]);

  useEffect(() => {
    const url = baseUrl + "api/client-feed/" + clients.login;

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
        setFeedArray(data);
      })
      .catch((error) => {});
  }, [clients]);

  return (
    <section>
      <div className="arrow-back">
        <Link href="/dashboard">
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
      <div className="feed">
        <h1 className="main-card-header">Feed</h1>
        <CreateSquealForm></CreateSquealForm>
        <div>{feedArray}</div>
      </div>
    </section>
  );
};

export default page;
