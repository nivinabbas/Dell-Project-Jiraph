import React from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
import "./PieChartAnalysis.css";
import MainTable from "../MainTable/MainTable"
const PieChartAnalysis = (props) => {
  const { UiObjs } = props;
  const features = [UiObjs[0].features, UiObjs[1].features, UiObjs[2].features];
  const [featuresToDisplay, setFeaturesToDisplay] = useState([]);
  const [tasks,setTasks]= useState([]);
  const [title,setTitle]=useState("");
  const options = {
    series: [UiObjs[0].featuresSize, UiObjs[1].featuresSize, UiObjs[2].featuresSize],
    labels: ['Light Changes(1-4)', 'Major Changes(5-9)', 'Critical Changes(10+)'],
    colors: ['#228B22', '#CCCC00', '#B22222'],
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          setFeaturesToDisplay(features[config.dataPointIndex])
          // if(config.dataPointIndex !=null)
          // return(
          // setFeaturesToDisplay(features[config.dataPointIndex])
          // )
        }
      }
    }
  }
  const handleClick = (tasks,title) => {
    setTasks(tasks)
    setTitle(title)
  }

  return (
    <div className="PieChartAnalysis__Wrapper">
      <Chart className="PieChartAnalysis__Chart"
        options={options}
        series={options.series}
        type="pie"
        width="470px"
      />
      {featuresToDisplay && 
      <div className="PieChartAnalysis__FeaturesTable">
        <table className="PieChartAnalysis__FeaturesTableContainer">
          <thead className="PieChartAnalysis__FeaturesTableHeader">
            <tr><th scope="col">#</th>
              <th scope="col">Feature ID</th>
              <th scope="col">Total Changes</th> 
              <th scope="col">Total Create</th>
              <th scope="col">Total Update</th> 
              <th scope="col">Total Delete</th>
            </tr>
          </thead>
          <tbody>
            {featuresToDisplay.map((task, index) => (
              <tr onClick={()=>handleClick(task.tasks,task._id)} key={index}>
                <th scope="row"> {++index} </th>
                <td> {task._id} </td>
                <td> {task.TotalChanges} </td>
                <td> {task.Create} </td>
                <td>
                  {task.Update}
                </td>
                <td>
                  {task.Delete}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      {tasks.length>0 && <div className="PieChartAnalysis__MainTable"><MainTable  tasks={tasks} title={title}/></div>}


    </div>
  );
};

export default PieChartAnalysis;
