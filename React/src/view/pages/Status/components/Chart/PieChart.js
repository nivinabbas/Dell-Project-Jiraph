import React from "react";
import Chart from "react-apexcharts";
import { isEmpty } from "../../../../../service/utils";

const PieChart = ({ name, dataPieChart }) => {
  let selectName = name;

  return (
    <div id="chart">
      {" "}
      {!isEmpty(dataPieChart) && (
        <Chart
          options={dataPieChart.options}
          series={dataPieChart.series}
          type="donut"
          style={{
            marginLeft: -30,
          }}
          width="350"
        />
      )}{" "}
    </div>
  );
};

export default PieChart;
