import React from 'react';
import "./Chart.css";
import MainTable from "../MainTable/MainTable"
import { useState } from 'react';


function Chart(props) {
  const { UiObjs } = props;
  const [tasks, setTasks] = useState([]);
  const handleClick = tasks => {
    return setTasks(tasks)
  }

  return (
    <div className="chart__Wrapper">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>


      <div className="chart">
        {UiObjs.length > 0 && UiObjs.map((columns, index) => {
          return (
            <div
              className='chart__column' key={index}>
              <div className="chart__Each_column">

                {columns.arr.length > 0 && columns.arr.map((column, index) => {
                  return (
                    <div key={index} style={{ height: `${(column.size / columns.maxLength) * 100}%` }} onClick={() => handleClick(column.tasks)} className="chart__innerColumn">
                      {column.size}
                    </div>
                  )
                })}
              </div>
              <div className='chart__label'>
                {columns._id}
              </div>


            </div>
          )
        })}
      </div>










      <div className="ModificationByFieldTable">
        {tasks && <MainTable changes={true} tasks={tasks} />}
      </div>

    </div>
  )
}



export default Chart;