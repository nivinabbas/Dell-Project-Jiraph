import React, { useRef } from 'react';
import "./Chart.css";
import MainTable from "../MainTable/MainTable"
import { useState } from 'react';

//
function Chart(props) {
  const { UiObjs } = props;


  const [tasks, setTasks] = useState([]);


  let maxLength = 1;
  let status = 0;
  let priority = 0;
  let qaRepresentative = 0
  {
    UiObjs &&
      UiObjs.map((column, index) => {
        if (column.numOfTasks > maxLength)
          maxLength = column.numOfTasks;

      });
  }


  const handleClick = tasks => {
    return setTasks(tasks)

  }

  // .chart_Colors{
  //   grid-area: chartColors;
  //   display: flex;
  //   flex-direction: column;
    
  //   }

  return (
    <div className="chart__Wrapper">
      
      <div className="chart">
     
        {UiObjs &&
          UiObjs.map((column, index) => {
            status = 0;
            priority = 0;
            qaRepresentative = 0;
            column.tasks.map((task) => {
              if (task.diffItem.updatedFields[0].fieldName == "status")
                status += 1;
              else if (task.diffItem.updatedFields[0].fieldName == "priority")
                priority += 1;
              else
                qaRepresentative += 1;
            })
            return (

              <div onClick={() => handleClick(column.tasks)} className='chart__column' style={{
                height: `${(column.tasks.length / maxLength) * 100}%`,
                // width: `${(1 / UiObj.length) * 90}%`
              }}>


                <div className="chart__Each_column">
                {status >0 && <div index={index} className='chart__innerColumn' style={{
                  background:"#D9514EFF" ,
                    height: `${(status / (status + priority + qaRepresentative)) * 100}%`,
                    // width: `${(1 / UiObj.length) * 90}%`
                  }}>
                    {status > 0 ? status : null}
                  </div>}
                  {priority > 0 && <div index={index} className='chart__innerColumn' style={{
                    background:"#2A2B2DFF",
                    height: `${(priority / (status + priority + qaRepresentative)) * 100}%`,
                    // width: `${(1 / UiObj.length) * 90}%`
                  }}>
                    {priority > 0 ? priority : null}
                  </div>}
                  
                  
                  
                  {qaRepresentative>0 && <div index={index} className='chart__innerColumn' style={{
                    background:"#2DA8D8FF",
                      height: `${(qaRepresentative / (status + priority + qaRepresentative)) * 100}%`,
                      // width: `${(1 / UiObj.length) * 90}%`
                    }}>
                      {qaRepresentative > 0 ? qaRepresentative : null}
                    </div>}
                    
                  </div>
                <div className='chart__label'>
                  {column._id}
                </div>
                
                <div className='chart__column__Text'>
                   S={status},
                  P={priority},
                  QR={qaRepresentative}

                </div>
                
              </div>


            )

          }
          )
        }

      </div>
      
      <div className="ModificationByFieldTable">
        {tasks && <MainTable tasks={tasks} />}
      </div>
    </div>
  )
}




export default Chart;