"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { ClientsContext } from "@/context/clients.context";
import moment from 'moment'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { baseUrl } from "@/app/shared";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const page = () => {
  const [squealNumber, setSquealNumber] = useState(0);
  const { clients, setClients } = useContext(ClientsContext);
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    /*    const url = baseUrl + "api/client-stats/" + clients.login;
    
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
            console.log(data);*/
    setData({
      labels: [1, 2, 3, 4],
      datasets: [
        {
          label: "Dataset 1",
          data: [4, 5, 10, 3],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
    /*   })
          .catch((error) => {
            console.log(error);
          });*/
  }, [clients]);

  useEffect(() => {
    const url = baseUrl + "api/squeal-made-by-user-count/" + clients.login;

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
        setSquealNumber(data);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
      });
  }, []);

  return (
    <section>
      <div className="arrow-back">
        <Link href="/dashboard">
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="main-card-header mb-3">{clients.login} Stats</h1>
        <p>Numero di Squeal: {squealNumber}</p>
        {data ? (
          <div className="w-2/3 mt-3 flex flex-col items-center">
            <Line options={options} data={data} />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default page;
