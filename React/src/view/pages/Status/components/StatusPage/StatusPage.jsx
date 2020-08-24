import React from "react";
import "./StatusPage.css";
import { useState } from "react";
import DashBoard from "../DashBoard/DashBoard";
import Table from "../Table/Table";

let array = [
  { name: "functional tests", number: 12 },
  { name: "fix versions", number: 10 },
  { name: "deleted tasks", number: 20 },
  { name: "total tasks", number: 36 },
];

const StatusPage = (props) => {
  // const [cardsContent,setCardsContent]=useState([]);
  // setCardsContent(array);
  // console.log(cardsContent)

  return (
    <div className="dashboard">
      <DashBoard cardsContent={array} />
      <Table />
    </div>
  );
};
export default StatusPage;
