import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./time.module.css";
import Button from "../../button/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labelsWeekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getLast30Days = () => {
  const labels = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    labels.push(day);
  }
  return labels;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
      font: {
        size: 18,
        weight: "bold",
      },
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
        text: "Day",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      ticks: {
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Value",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      ticks: {
        font: {
          size: 16,
          weight: "bold",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        stepSize: 10,
        min: 0, // Ensure fixed range
        max: 100, // Ensure fixed range
      },
    },
  },
  datasets: {
    text: {
      font: {
        size: 60,
        weight: "bold",
      },
    },
  },
};

const data1 = [
  {
    labels: labelsWeekly,
    datasets: [
      {
        label: "Tỉ lệ hàng bỏ vào giỏ",
        data: Array.from(
          { length: 45 },
          () => Math.floor(Math.random() * 11) + 65
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tỉ lệ trả lại hàng",
        data: Array.from(
          { length: 45 },
          () => Math.floor(Math.random() * 11) + 25
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  },
  {
    labels: getLast30Days(),
    datasets: [
      {
        label: "Tỉ lệ hàng bỏ vào giỏ",
        data: Array.from(
          { length: 45 },
          () => Math.floor(Math.random() * 11) + 65
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Tỉ lệ trả hàng",
        data: Array.from(
          { length: 45 },
          () => Math.floor(Math.random() * 11) + 25
        ),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
      },
    ],
  },
];

const data2 = [
  {
    labels: labelsWeekly,
    datasets: [
      {
        label: "Tỉ lệ lấy hàng bình thưởng",
        data: Array.from(
          { length: 65 },
          () => Math.floor(Math.random() * 11) + 65
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tỉ lệ lấy hàng không thoải mái",
        data: Array.from(
          { length: 45 },
          () => Math.floor(Math.random() * 11) + 25
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  },
  {
    labels: getLast30Days(),
    datasets: [
      {
        label: "Tỉ lệ lấy hàng bình thưởng",
        data: Array.from(
          { length: 45 },
          () => Math.floor(Math.random() * 11) + 65
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Tỉ lệ lấy hàng không thoải mái",
        data: Array.from(
          { length: 45 },
          () => Math.floor(Math.random() * 11) + 25
        ),
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
            <div className={styles.link}>Theo tháng</div>
          </div>
        </div>
      </div>

      <Line
        style={{ marginBottom: "30px" }}
        options={options}
        data={data1[selectedDatasetIndex]}
      />
      <Line
        style={{ marginBottom: "30px" }}
        options={options}
        data={data2[selectedDatasetIndex]}
      />
    </div>
  );
};

export default LineChart;
