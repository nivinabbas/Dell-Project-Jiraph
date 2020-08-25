import React from "react";
import "./StatusPage.css";
import { useState, useEffect} from "react";
import SelectInput from "../Select/SelectInput";
import DashBoard from "../DashBoard/DashBoard";

import Table from "../Table/Table";

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
  
  const [cardsContent,setCardsContent]=useState([]);
  
 

  useEffect(()=>{
    console.log('getDailyAlerts')
    fetch('http://localhost:4000/api/status/dailyAlerts')
    .then(res => res.json())
    .then(data=>console.log(data))
  },[])

  // setCardsContent(array);
  // console.log(cardsContent)

  return (
    <div className="statuspage">
      <div className="statuspage__dashboard">
        <DashBoard cardsContent={cardsContent} />
      </div>
      <div className="statuspage__table">
        <Table />
      </div>
      <div className="statuspage__chart"></div>
      <div className="statuspage__pie"></div>
    </div>
  );
};
export default StatusPage;
