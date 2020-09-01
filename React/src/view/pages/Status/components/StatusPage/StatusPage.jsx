import React from "react";
import "./StatusPage.css";
import { useState, useEffect } from "react";
import SelectInput from "../Select/SelectInput";
import DashBoard from "../DashBoard/DashBoard";
import Pie from "../Pie/Pie";
import ColumnChart from "../ColumnChart/ColumnChart";

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
  //   const [cardsContent,setCardsContent]=useState([]);

  //   useEffect(()=>{
  //     console.log('getDailyAlerts')
  //     fetch('http://localhost:4000/api/status/dailyAlerts')
  //     .then(res => res.json())
  //     .then(data=>console.log(data))
  //   },[])

  // setCardsContent(array);
  // console.log(cardsContent)

  return (
    <div className="statusPageContainer">
      <div className="statuspage__dashboard">
        <DashBoard cardsContent={array} />
      </div>
      <div className="statusPageContainerTableColumn">
        <div className="statuspage__table">
          <Table />
        </div>
        <div className="statuspage__chart">
          <ColumnChart />
        </div>
      </div>
      <div className="statuspage__pie">
        <Pie />
      </div>
    </div>
  );
};
export default StatusPage;
