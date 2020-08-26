import React, { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NavBar from "../../../components/common/NavBar/index";
import StatusPage from "../Status/components/StatusPage/StatusPage";
import "./style.css";

const Home = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <NavBar />
      <div className="home-content">
        <Switch>
          <Route path={`${path}/status`}>
            <StatusPage />
          </Route>
          <Route path={`${path}/analytics`}>
            <h1>analytics</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Home;
