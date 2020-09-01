import React from "react";
import Chart from "react-apexcharts";
import Select from "react-select";

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

const optionDone = [
  { value: "Done", label: "Done" },
  { value: "Not Done", label: "Not Done" },
];
const PieChart = (props) => {
  return (
    <div id="chart">
      <Select options={optionDone} />
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
