import React from "react";
import "./StatusPage.css";
import { useState } from "react";
import SelectInput from "../Select/SelectInput";
import DashBoard from "../DashBoard/DashBoard";

let array = [
  { name: "functional tests", number: 12 },
  { name: "fix versions", number: 10 },
  { name: "deleted tasks", number: 20 },
  { name: "total tasks", number: 36 },
];

const optionSprint = [
  { value: "Backlog", label: "Backlog" },
  { value: "inProgress", label: "In Progress" },
  { value: "Done", label: "Done" },
];
const StatusPage = (props) => {
  // const [cardsContent,setCardsContent]=useState([]);
  // setCardsContent(array);
  // console.log(cardsContent)

  return (
    <div className="dashboard">
      <DashBoard cardsContent={array} />

      <SelectInput
        options={optionSprint}
        //dataKey="statusField"
        //onSelect={onFilterChange}
        isMulti={true}
      />
    </div>
  );
};
export default StatusPage;
