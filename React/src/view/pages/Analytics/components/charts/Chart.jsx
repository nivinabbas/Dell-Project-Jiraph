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
//   console.log(UiObjs);
//   return (
//     <div className="chart__Wrapper">

//       <div className="chart">

//         {UiObjs &&
//           UiObjs.map((columns, index) => {

//             return (

//               <div
//                 onClick={() => handleClick(column.tasks)}
//                 className='chart__column'
//                 style={{ height: `${(column.tasks.length / maxLength) * 100}%` }}>


//                 <div className="chart__Each_column">
//                   {columns.length.}



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