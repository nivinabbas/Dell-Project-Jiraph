import React from "react";
import Chart from "react-apexcharts";
import { useState } from "react";


const PieChartAnalysis = (props) => {
  const {UiObjs} = props;
  console.log(UiObjs)
 const [tasks,setTasks]=useState([]);
  
  

 
  const options = {
    series: [UiObjs[0].featuresSize, UiObjs[1].featuresSize, UiObjs[2].featuresSize],
    labels: ['Light Changes','Major Changes','Critical Changes'],
    colors: ['#00ff00','#ffff00','#ff0000'],
    chart: {
      events: {
        dataPointSelection: function(event, chartContext, config) {
          console.log(UiObjs[config.dataPointIndex].features)
          // console.log([config.dataPointIndex])
          console.log(config.dataPointIndex)
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
