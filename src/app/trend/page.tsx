"use client";

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
import { useContext, useEffect, useState } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "../shared";
import Navbar from "@/components/Navbar";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  return (
    <>
      <Navbar />
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div>
        {data ? (
          <div className="w-2/3">
            {" "}
            <Line options={options} data={data} />{" "}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default page;
