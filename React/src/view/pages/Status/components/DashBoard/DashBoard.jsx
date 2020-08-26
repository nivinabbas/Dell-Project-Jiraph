import React from "react";
import "./DashBoard.css";
import DashBoardCard from "../DashBoardCard/DashBoardCard";

const array = [
  { name: "functional tests", number: 12 },
  { name: "fix versions", number: 10 },
  { name: "deleted tasks", number: 20 },
  { name: "total tasks", number: 36 },
];

const DashBoard = ({ cardsContent }) => {
  console.log(cardsContent);

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
