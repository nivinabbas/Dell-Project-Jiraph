import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../../components/common/NavBar/index";
import "./style.css";
import StatusPage from "../Status/components/StatusPage/StatusPage";

const Home = () => {
  return (
    <Fragment>
      <NavBar />
      <div className="home-content">
        <Switch>
          <Route path="/home/status">
            <StatusPage />
          </Route>
          <Route path="/home/analytics"></Route>
        </Switch>
      </div>
    </Fragment>
  );
};

export default Home;
