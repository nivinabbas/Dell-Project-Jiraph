import React from "react";
import "./style.css";

/////////////Presenting Data Table/////////////

const dummyData = [
  { a: "a", b: "b" },
  { a: "a2", b: "b2" },
];
const getTableData = (data) => {
  return data.map((d) => {
    return (
      <tr >
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

const Table = ({ data }) => {
  return (
    <table>
      <tbody className="container">
        {getTableHeader(dummyData[0])}
        {getTableData(dummyData)}
      </tbody>
    </table>
  );
};

export default Table;
