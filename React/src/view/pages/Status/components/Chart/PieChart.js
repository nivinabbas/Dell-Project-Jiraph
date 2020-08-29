import React from "react";
import Chart from "react-apexcharts";
import SelectInput from "../Select/SelectInput";

const dummyData = {
  series: [44, 55],
  options: {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
const PieChart = (props) => {
  return (
    <div id="chart">
      <SelectInput />
      <Chart
        options={dummyData.options}
        series={dummyData.series}
        type="donut"
        style={{ marginLeft: -30 }}
        width="380"
      />
    </div>
  );
};

export default PieChart;
