import React from "react";
import "./style.css";
import shadows from "@material-ui/core/styles/shadows";

const DailyAlerts = (props) => {
  return (
    <div className="daily-alerts">
      {/* <div className="daily-alerts-title">
        <h1>Daily Alerts</h1>
      </div> */}

      <div className="daily-alerts-items">
        <div
          className="daily-alerts-item1"
          style={{ backgroundColor: "#444444" }}
        >
          <h3>Functional Tests</h3>
          <span>3</span>
        </div>

        <div
          className="daily-alerts-item2"
          style={{ backgroundColor: "#808080" }}
        >
          <h3>Fix Version</h3>
          <span>1</span>
        </div>
        <div
          className="daily-alerts-item3"
          style={{ backgroundColor: "#41B6E6" }}
        >
          <h3>Deleted Tasks</h3>
          <span>4</span>
        </div>
        <div
          className="daily-alerts-item4"
          style={{ backgroundColor: "#0076CE",}}
        >
          <h3>Total Changes</h3>
          <span>8</span>
        </div>
      </div>
    </div>
  );
};

export default DailyAlerts;
