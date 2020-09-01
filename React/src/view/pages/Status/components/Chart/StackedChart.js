import React from "react";
import Chart from "react-apexcharts";

// const dummyData = {
//   series: [
//     {
//       name: "Done",
//       data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43],
//     },
//     {
//       name: "Not Done",
//       data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43],
//     },

//   ],
//   options: {
//     chart: {
//       type: "bar",
//       height: 350,
//       stacked: true,
//     },

//     xaxis: {
//       type: "datetime",
//       categories: [
//         "01/01/2011 GMT",
//         "01/02/2011 GMT",
//         "01/03/2011 GMT",
//         "01/04/2011 GMT",
//         "01/05/2011 GMT",
//         "01/06/2011 GMT",
//         "01/07/2011 GMT",
//         "01/08/2011 GMT"

//       ],
//     },

//   },
// };


export default function StackedChart({ stackedChart }) {

  stackedChart.options.chart = {

    type: "bar",
    height: 350,
    stacked: true,

  }
  console.log(stackedChart)

  return (
    <div id="daily_chart" style={{ width: "100%" }}>
      <Chart
        options={stackedChart.options}
        height="450"
        series={stackedChart.series}
        type="bar"
      />
    </div>
  );
};
