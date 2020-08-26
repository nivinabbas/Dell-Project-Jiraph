import React from "react";
import "./StatusPage.css";
import { useState, useEffect } from "react";
import SelectInput from "../Select/SelectInput";
import DashBoard from "../DashBoard/DashBoard";
import Chart from "../../../../../components/charts/Chart";
import Pie from "../Pie/Pie";

import Table from "../Table/Table";
import StackedChart from "../Chart/StackedChart";
import PieChart from "../Chart/PieChart";

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
  // pie chart 1 :
  // const [FunctionalPieContent, setFunctionalPieContent] = useState([]);
  // const [cardsContent, setCardsContent] = useState([]);

  // useEffect(() => {
  //   console.log("getDailyAlerts");
  //   fetch("http://localhost:4000/api/status/dailyAlerts")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let { success, error, info } = data;
  //       console.log(success, error, info);
  //       if (success) {
  //         setCardsContent(info);
  //       } else {
  //         alert(error);
  //       }
  //     });
  // }, []);

  // setCardsContent(array);

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
          <StackedChart />
        </div>
      </div>
      <div className="statuspage__chart">
        <StackedChart />
      </div>
      <div className="statuspage__pie">
        <PieChart />
        <PieChart />
      </div>
    </div>
  );

  // fetch("/api/Functionalpiechart", {
  //   method: "POST",
  //   body: JSON.stringify({}),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     let { success, error, info } = data;
  //     if (success) {
  //       setFunctionalPieContent(info);
  //     } else {
  //       alert(error);
  //     }
  //   });
};
export default StatusPage;
