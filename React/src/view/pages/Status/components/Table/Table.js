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

const optionPosition = [
  { value: "oldValue", label: "Old Value" },
  { value: "newValue", label: "New Value" },
];
const optionSprint = [
  { value: "Backlog", label: "Backlog", value: { value: true } },
  { value: "inProgress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

const Table = ({ data }) => {
  return (
    <div>
      <div className="filtersContainer">
        <SelectInput
          options={optionPosition}
          dataKey="oldnewvalue"
          //onSelect={onFilterChange}
        />
        <SelectInput
          options={optionSprint}
          dataKey="statusField"
          // onSelect={onFilterChange}
          isMulti={true}
        />
        <DatePicker />
        {/* onDateChange={onFilterChange} */}
        <button className="submitButton">
          {/* onClick={fetchFilteredData} */}
          Submit
        </button>
      </div>
      <table>
        <tbody className="container">
          {getTableHeader(dummyData[0])}
          {getTableData(dummyData)}
        </tbody>
      </table>
    </div>
  );
};
