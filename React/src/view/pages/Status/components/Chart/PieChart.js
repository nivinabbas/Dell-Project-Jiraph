import React from "react";
import Chart from "react-apexcharts";
import Select from 'react-select'


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


const PieChart = ({ onmodificationTypePieSelect, name, selectOptions }) => {

  let selectName = name;
  return (
    <div id="chart">
      <Select
        options={selectOptions}
        onChange={(filter, name) => onmodificationTypePieSelect(filter, selectName)}
      />
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
