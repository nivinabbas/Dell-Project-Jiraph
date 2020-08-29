import React from "react";
import "./style.css";
import SelectInput from "../Select/SelectInput";
import DatePicker from "../Select/datePicker";

/////////////Presenting Data Table/////////////

const dummyData = [
  { a: "a", b: "b", c: "", d: "" },
  { a: "a2", b: "b2" },
  { a: "a2", b: "b2" },
  { a: "a2" },
];
const getTableData = (data) => {
  return data.map((d) => {
    return (
      <tr>
        {Object.keys(d).map((key, index) => {
          return <td key={index}>{d[key]}</td>;
        })}
      </tr>
    );
  });
};

const getTableHeader = (item) => {
  return (
    <tr>
      {Object.keys(item).map((key, index) => {
        return <th key={index}>{key}</th>;
      })}
    </tr>
  );
};

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

export default Table;
