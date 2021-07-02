import React from "react";
import { Line } from "react-chartjs-2";

export default function PriceChart({ optionClass, hideChart }) {
  const data = {
    labels: ["12", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        backgroundColor: "rgb(255, 99, 132,0.1)",
        borderColor: "rgba(255, 99, 132, 0.9)",
      },
    ],
  };

  const options = {
    //   scales: {
    //     yAxes: [
    //       {
    //         ticks: {
    //           beginAtZero: true,
    //           callback: function(value, index, values) {
    //             return  "2";
    //         },
    //         scaleLabel: {
    //             display: true,
    //             labelString: '1k = 1000'
    //         }
    //         },
    //       },
    //     ],
    //   },
    responsive: true,
    layout: {
      padding: 20,
    },
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return value + "€";
          },
        },
      },
    },
  };

  return (
    <div
      onClick={hideChart}
      className={`chartContainer ${optionClass}`}
      style={{ margin: "1rem", maxWidth: "100vw" }}
    >
      <Line className="chart" data={data} options={options} />
    </div>
  );
}
