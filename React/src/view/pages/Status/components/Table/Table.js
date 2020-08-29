// import React from "react";
// import "./style.css";
// import React from "react";
// import "./style.css";
// import SelectInput from "../Select/SelectInput";
// import DatePicker from "../Select/datePicker";

// /////////////Presenting Data Table/////////////

// const dummyData = [
//   {
//     a: "a",
//     b: "b",
//     c: "sa",
//     d: "sda",
//     f: "done",
//   },
//   {
//     a: "a2",
//     b: "b2",
//     c: "sa",
//     d: "sasa",
//     f: "done",
//   },
//   {
//     a: "a2",
//     b: "b2",
//     c: "sa",
//     d: "sa",
//     f: "done",
//   },
//   {
//     a: "a2",
//     c: "a",
//     d: "aa",
//     f: "done",
//   },
// ];
// const getTableData = (data) => {
//   return data.map((d) => {
//     return (
//       <tr>
//         {Object.keys(d).map((key, index) => {
//           return (
//             <div className="">
//               {d.key === "f" ? (
//                 <SelectInput
//                   options={[
//                     { id: 1, value: "yes", label: "Yes" },
//                     { id: 2, value: "no", label: "No" },
//                   ]}
//                 ></SelectInput>
//               ) : (
//                 <td key={index}> {d[key]} </td>
//               )}
//             </div>
//           );
//         })}
//       </tr>
//     );
//   });
// };

// const getTableHeader = (item) => {
//   return (
//     <tr>
//       {Object.keys(item).map((key, index) => {
//         return <th key={index}> {key} </th>;
//       })}
//     </tr>
//   );
// };

// const optionPosition = [
//   {
//     value: "oldValue",
//     label: "Old Value",
//   },
//   {
//     value: "newValue",
//     label: "New Value",
//   },
// ];
// const optionSprint = [
//   {
//     value: "Backlog",
//     label: "Backlog",
//     value: {
//       value: true,
//     },
//   },
//   {
//     value: "inProgress",
//     label: "In Progress",
//   },
//   {
//     value: "Done",
//     label: "Done",
//   },
// ];

import React, { Fragment } from "react";
import Select from "../Select";
import "./style.css";

const selectDoneOptions = [
  { id: 1, label: "Yes", value: "yes" },
  { id: 2, label: "No", value: "no" },
];
export default function TasksTable({ openTasks }) {
  return (
    <Fragment>
      <div className="open-tasks">
        <div className="open-tasks-title">
          <h3>Open Tasks</h3>
        </div>
        <div className="open-tasks-table">
          <table className="table x">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Jira Name</th>
                <th scope="col">Field Name</th>
                <th scope="col">Old Val</th>
                <th scope="col">New Val</th>
                <th scope="col">Done</th>
              </tr>
            </thead>
            <tbody>
              {openTasks.map((task, index) => (
                <tr key={index}>
                  <th scope="row">{++index}</th>
                  <td>{task.jiraItem.jiraId}</td>
                  <td className="jiraname-column">{task.jiraItem.jiraName}</td>
                  <td>{task.diffItem.updatedFields[0].fieldName}</td>
                  <td>{task.diffItem.updatedFields[0].oldValue}</td>
                  <td>{task.diffItem.updatedFields[0].newValue}</td>
                  <td>
                    <Select options={selectDoneOptions} onSelect={} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
