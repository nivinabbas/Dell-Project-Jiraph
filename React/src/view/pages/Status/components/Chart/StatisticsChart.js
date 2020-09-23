import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./StackedChart.css";

const options = {
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    toolbar: {
      show: false,
    },
    // yaxis: {
    //   axisBorder: {
    //     show: true,
    //   },
    //   title: {
    //     text: "Days to task completion ",
    //     align: "center",
    //     margin: 10,
    //     offsetX: 0,
    //     offsetY: 0,
    //   },
    // },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },

  title: {
    text: "Days to task completion ",
    align: "center",
    margin: 10,
    offsetX: -10,
    offsetY: 425,
  },

  yaxis: {
    show: true,

    title: {
      text: "Number of tasks completed",
      style: {
        fontSize: "14px",
      },
    },
  },
  // xaxis: {
  //   show: true,
  //   title: { text: "Days to task completion " },
  // },

  fill: {
    opacity: 1,
    colors: ["#388E3C"],
  },
  colors: ["#388E3C"],
  // yaxis: {
  //   labels: {
  //     show: true,
  //     text: "N",
  //     align: "left",
  //   },
  // },
};
export default function StatisticsChart({ data = [], onDataSelected }) {
  const series = [
    {
      name: "Number of tasks",
      data: data.map((d) => d.Done),
      tasks: data.map((d) => d.tasks),
    },
  ];

  const categories = data.map((d) => d.date);

  const xaxis = {
    categories: categories,
  };

  options.chart.events = {
    dataPointSelection: function (
      event,
      chartContext,
      { dataPointIndex, seriesIndex }
    ) {
      console.log(seriesIndex);
      let tasks = series[seriesIndex].tasks[dataPointIndex];
      let date = categories[dataPointIndex];

      return onDataSelected(date, tasks);
    },
  };

  return (
    <div id="daily_chart" style={{ width: "100%" }}>
      <Chart
        options={{ ...options, xaxis }}
        height="450"
        series={series}
        type="bar"
      />
    </div>
  );
}
