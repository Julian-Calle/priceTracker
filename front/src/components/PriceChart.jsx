import React from "react";
import { Line } from "react-chartjs-2";

export default function PriceChart({ optionClass, hideChart, timeline, name }) {
  const priceValues = timeline.map((item) => item.price);
  const datesValues = timeline.map((item) => new Date(item.date).toISOString());
  console.log(priceValues);
  console.log(datesValues);
  const data = {
    // labels: ["12", "2", "3", "4", "5", "6"],
    labels: datesValues,
    datasets: [
      {
        // label: "# of Votes",
        label: `Price of ${name}`,
        data: priceValues,
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
      <Line className={`chart ${optionClass}`} data={data} options={options} />
    </div>
  );
}
