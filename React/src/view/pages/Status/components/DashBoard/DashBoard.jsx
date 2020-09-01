import React from "react";
import "./DashBoard.css";
import DashBoardCard from "../DashBoardCard/DashBoardCard";

const DashBoard = ({ cardsContent }) => {
  return (
    <div className="dashboard">
      {cardsContent.map((cardsContentItem, index) => {
        return (
          <DashBoardCard key={index} cardsContentItem={cardsContentItem} />
        );
      })}
    </div>
  );
};

export default DashBoard;
