import React from "react";
import Chart from "react-apexcharts";

const dummyData = {
  series: [
    {
      name: "Backlog",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "Done",
      data: [13, 23, 20, 8, 13, 27],
    },
    {
      name: "InProgress",
      data: [11, 17, 15, 15, 21, 14],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
      ],
    },
    legend: {
      position: "bottom",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  },
};

export default () => {
  return (
    <div id="daily_chart" style={{ width: "100%" }}>
      <Chart
        options={dummyData.options}
        height="450"
        series={dummyData.series}
        type="bar"
      />
    </div>
  );
};
