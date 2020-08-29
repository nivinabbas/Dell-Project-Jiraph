// import React, { useRef } from 'react';
// import "./Chart.css";
// import MainTable from "../MainTable/MainTable"
// import { useState } from 'react';


// function Chart(props) {
//   const { UiObjs } = props;


//   const [tasks, setTasks] = useState([]);


//   const handleClick = tasks => {
//     return setTasks(tasks)

//   }

//   return (
//     <div className="chart__Wrapper">
      
//       <div className="chart">
     
//         {UiObjs &&
//           UiObjs.map((column, index) => {
            
//             return (

//               <div 
//               onClick={() => handleClick(column.tasks)} 
//               className='chart__column'
//                style={{height: `${(column.tasks.length / maxLength) * 100}%`}}>


//                 <div 
//                 className="chart__Each_column">
//                 {status >0 
//                 &&
//                  <div index={index} 
//                  className='chart__innerColumn' 
//                  style={{ height: `${(status / (status + priority + qaRepresentative)) * 100}%`,
//                   }}>
//                     {status > 0 ? status : null}
//                   </div>}
                  
//                   {priority > 0 && <div index={index} className='chart__innerColumn' style={{
//                     height: `${(priority / (status + priority + qaRepresentative)) * 100}%`,
//                   }}>
//                     {priority > 0 ? priority : null}
//                   </div>}
//                   {qaRepresentative>0 && <div index={index} className='chart__innerColumn' style={{
//                       height: `${(qaRepresentative / (status + priority + qaRepresentative)) * 100}%`,
//                     }}>
//                       {qaRepresentative > 0 ? qaRepresentative : null}
//                     </div>}
//                   </div>
//                 <div className='chart__label'>
//                   {column._id}
//                 </div>
//               </div>


//             )

//           }
//           )
//         }

//       </div>
      
//       <div className="ModificationByFieldTable">
//         {tasks && <MainTable tasks={tasks} />}
//       </div>
//     </div>
//   )
// }




// export default Chart;