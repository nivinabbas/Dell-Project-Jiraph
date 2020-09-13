import React from "react";
import "./style.css";
import shadows from "@material-ui/core/styles/shadows";

const DailyAlerts = ({ cardsContent }) => {
  return (
    <div className="daily-alerts">
      {/* <div className="daily-alerts-title">
        <h1>Daily Alerts</h1>
      </div> */}
      {!isEmpty(cardsContent) && (
        <div className="daily-alerts-items">
          <div
            className="daily-alerts-item"
            style={{ backgroundColor: "#ff5722" }}
          >
            <h3>Functional Tests</h3>
            <span>{cardsContent[0].number}</span>
          </div>

          <div
            className="daily-alerts-item"
            style={{ backgroundColor: "#2196f3" }}
          >
            <h3>Fix Version</h3>
            <span>{cardsContent[2].number}</span>
          </div>
          <div
            className="daily-alerts-item"
            style={{ backgroundColor: "#009688" }}
          >
            <h3>Deleted Tasks</h3>
            <span>{cardsContent[1].number}</span>
          </div>
          <div
            className="daily-alerts-item"
            style={{ backgroundColor: "#3f51b5" }}
          >
            <h3>Total Changes/Not Done</h3>
            <span>{cardsContent[3].number}</span>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default DailyAlerts;
