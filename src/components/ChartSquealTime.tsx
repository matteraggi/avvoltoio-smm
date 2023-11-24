import { useContext, useEffect, useRef, useState } from "react";
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
  const timeFrame = useRef("7");
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  //labels (asse x) come input dell'utente che può visualizzare il periodo che vuole
  //asse y in base ai dati che ci sono
  //dataset in ritorno come array di oggetti con i due dati da rappresentare. In questo caso: timestamp (giorni, settimane, mesi) e numero di squeal
  const getChartData = () => {
    const url =
      baseUrl +
      "api/squeal-time-chart/" +
      clients.login +
      "/" +
      timeFrame.current;
    var labels = [];
    var today = new Date();
    const max = Number(timeFrame.current);
    for (var i = max - 1; i >= 0; i--) {
      // Generate the date for each label by subtracting the number of days from the current date
      var date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      labels.push(date.toLocaleDateString());
    }
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
        console.log("data: ", data);
        setData({
          //mettere coeme labels invece che solo i giorni in cui ho postato, tutti i giorni (a seconda del lasso selezionato)
          labels: labels,
          datasets: [
            {
              label: "Squeal per day",
              data: data.map((item: any) => item.y),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChartData();
  }, [clients]);

  const selectTimeframe = () => {
    timeFrame.current = (
      document.getElementById("mySelect") as HTMLInputElement
    ).value;

    getChartData();
  };

  return (
    <div className="flex flex-col items-center my-10 chart">
      {data ? (
        <div className="w-2/3 mt-3 flex flex-col items-center">
          <select id="mySelect" onChange={selectTimeframe}>
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </div>
  );
};

export default ChartSquealTime;
