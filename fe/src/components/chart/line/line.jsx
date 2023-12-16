import React, { useState } from "react";
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
import { Line } from "react-chartjs-2";
import styles from "./time.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

const data = [
  {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [500, 700, 300, 800, 400, 900, 600],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [700, 300, 600, 400, 900, 500, 800],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  },
  {
    labels,
    datasets: [
      {
        label: "Dataset 3",
        data: [300, 500, 200, 600, 300, 700, 400],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Dataset 4",
        data: [400, 200, 500, 300, 600, 400, 800],
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
      },
    ],
  },
];

const LineChart = () => {
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState(0);

  const handleTheoTuanClick = () => {
    setSelectedDatasetIndex(0);
  };

  const handleTheoNgayClick = () => {
    setSelectedDatasetIndex(1);
  };

  return (
    <div className="container">
      <div className={styles.nav}>
        <div className={styles.ul}>
          <div className={styles.li} onClick={handleTheoTuanClick}>
            <div className={styles.link}>Theo tuần</div>
          </div>

          <div className={styles.li} onClick={handleTheoNgayClick}>
            <div className={styles.link}>Theo ngày</div>
          </div>
        </div>
      </div>
      <Line options={options} data={data[selectedDatasetIndex]} />
    </div>
  );
};

export default LineChart;
