import React from "react";
import "./style.css";
import shadows from "@material-ui/core/styles/shadows";
import {isEmpty } from '../../../../../service/utils';

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
            style={{ backgroundColor: "#EE6411" }}
          >
            <h3 className="daily-alerts-item__name">Functional Tests</h3>
            <span>{cardsContent[0].number}</span>
          </div>

          <div
            className="daily-alerts-item"
            style={{ backgroundColor: "#6EA204" }}
          >
            <h3 className="daily-alerts-item__name">Fix Version</h3>
            <span>{cardsContent[2].number}</span>
          </div>
          <div
            className="daily-alerts-item"
            style={{ backgroundColor: "#0076CE " }}
          >
            <h3 className="daily-alerts-item__name">Deleted Tasks</h3>
            <span>{cardsContent[1].number}</span>
          </div>
          <div
            className="daily-alerts-item"
            style={{ backgroundColor: "#00447C" }}
          >
            <h3 className="daily-alerts-item__name">Total Changes/Not Done</h3>
            <span>{cardsContent[3].number}</span>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default DailyAlerts;
