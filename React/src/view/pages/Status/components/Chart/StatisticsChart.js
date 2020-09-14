import React from "react";
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
    zoom: {
      enabled: true,
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

    legend: {
      position: "right",
      offsetY: 40,
    },
  },
  fill: {
    opacity: 1,
    colors: "#388E3C",
  },
};
export default function StatisticsChart({ data = [], onDataSelected }) {

  const series = [
    {
      name: "Done",
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
      //console.log("series.tasks", series[0].tasks);
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
