import React from "react";
import Chart from "react-apexcharts";
import "./StackedChart.css";

const options = {
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    //stackType: "100%",
    toolbar: {
      show: true,
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
    fill: {
      opacity: 1,
    },
  },
};
export default function StatisticsChart( {data = [] }) {
    console.log("test ")
    console.log("data: ",data[0])
    const series = [
      { name: "done", data: data[0] },
     ];
  
     console.log("series",series)
    // const categories = data.map((d) => d.date);
  
    // const xaxis = {
    //   categories: categories,
    // };
  
    // options.chart.events = {
    //   dataPointSelection: function (
    //     event,
    //     chartContext,
    //     { dataPointIndex, seriesIndex }
    //   ) {
    //     let status = series[seriesIndex].name;
    //     let date = categories[dataPointIndex];
  
        // return onDataSelected(date, status);
    // //   },
    // };
  
    return (
      <div id="daily_chart" style={{ width: "100%" }}>
        <Chart
          options={{ ...options }}
          height="450"
          series={series}
          type="bar"
        />
      </div>
    );
  }
  
  