import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "@/app/shared";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartSquealTime = () => {
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

  //labels (asse x) come input dell'utente che pul visualizzare il periodo che vuole
  //asse y in base ai dati che ci sono o che parte de 0
  //dataset in ritorno come array di oggetti con i due dati da rappresentare. In questo caso: timestamp (giorni, settimane, mesi) e numero di squeal
  useEffect(() => {
    const url = baseUrl + "api/squeal-time-chart/" + clients.login;
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
        setData({
          labels: [1, 2, 3, 4],
          datasets: [
            {
              label: "Dataset 1",
              data: data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clients]);

  return (
    <div>
      {data ? (
        <div className="w-2/3 mt-3 flex flex-col items-center">
          <Line options={options} data={data} />
        </div>
      ) : null}
    </div>
  );
};

export default ChartSquealTime;
