import React from "react";
import Chart from "react-apexcharts";
import { isEmpty } from "../../../../../service/utils";

export default function StackedChart({ stackedChart }) {
  if (!isEmpty(stackedChart)) {
    stackedChart.options.chart = {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
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
    };
  }

  return (
    <div id="daily_chart" style={{ width: "100%" }}>
      {!isEmpty(stackedChart) && (
        <Chart
          options={stackedChart.options}
          height="450"
          series={stackedChart.series}
          type="bar"
        />
      )}
    </div>
  );
}
