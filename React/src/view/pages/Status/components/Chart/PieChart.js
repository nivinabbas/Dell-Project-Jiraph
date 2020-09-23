import React from "react";
import Chart from "react-apexcharts";
import "./PieChart.css";
import { isEmpty } from "../../../../../service/utils";

const PieChart = ({ name, dataPieChart }) => {
  let options = {
    fill: {
      opacity: 1,
      colors: ["#4caf50", "#FF6900"],
    },
    colors: ["#4caf50", "#FF6900"],
    labels: ["Done", "Not Done"],
  };

  return (
    <div id="chart">
      {!isEmpty(dataPieChart) && (
        <Chart
          options={(dataPieChart.options, options)}
          series={dataPieChart.series}
          type="donut"
          style={{
            marginLeft: -30,
          }}
          width="450"
        />
      )}
    </div>
  );
};

export default PieChart;
