import React from "react";
import "./DashBoard.css";
import DashBoardCard from "../DashBoardCard/DashBoardCard";
import DailyAlerts from "../DailyAlerts/index";

const DashBoard = ({ cardsContent }) => {
  return (
    // <div className="dashboard">
    //   {cardsContent.map((cardsContentItem, index) => {
    //     return (
    //       <DashBoardCard key={index} cardsContentItem={cardsContentItem} />
    //     );
    //   })}
    // </div>
    <DailyAlerts></DailyAlerts>
  );
};

export default DashBoard;
