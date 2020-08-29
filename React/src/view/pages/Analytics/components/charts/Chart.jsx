import React, { useRef } from 'react';
import "./Chart.css";
import MainTable from "../MainTable/MainTable"
import { useState } from 'react';


function Chart(props) {
  const { UiObjs } = props;
  const [tasks, setTasks] = useState([]);
  const handleClick = tasks => {
    return setTasks(tasks)
  }
  console.log(UiObjs)
  return (
    <div className="chart__Wrapper">
      <div className="chart">
      {UiObjs.length > 0 && UiObjs.map((columns, index) => {
        return (
          <div
            className='chart__column'
            style={{ height: "100%" }}>
            <div className="chart__Each_column">
              {columns.arr.length > 0 && columns.arr.map((column, index) => {
                
                console.log(column.tasks)
                return (
                  
                  <div style={{ height: `${column.size / UiObjs.maxLength * 100}%` }} onClick={() => handleClick(column.tasks)} className="chart__innerColumn">
                    {column.size}

                 
                  </div>
                )
              })}
             </div>
          </div>


        )
      })}
      </div>










      <div className="ModificationByFieldTable">
        {tasks && <MainTable tasks={tasks} />}
      </div>

    </div>
  )
}



export default Chart;