import React from "react";
import Chart from "react-apexcharts";


const PieChartAnalysis = (props) => {
  const {UiObjs} = props;
  console.log(UiObjs)
  const tasks=["tasks ta3on critical","tasks ta3on Major","tasks ta3on Light"]
  const options = {
    series: [0, 55, 13],
    labels: ['Critical Changes', 'Major Changes', 'Light Changes',],
    colors: ['#ff0000', '#ffff00', '#00ff00'],
    chart: {
      events: {
        dataPointSelection: function(event, chartContext, config) {
          
          console.log(tasks[config.dataPointIndex])
          console.log(options.labels[config.dataPointIndex])
        }
      }
    }
  }

  return (
    <div>
        <Chart
          options={options}
          series={options.series}
          type="pie"
          width="500px"
          
        />




</div>
  );
};

export default PieChartAnalysis;
