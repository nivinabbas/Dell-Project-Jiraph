import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../../components/common/NavBar/index";
import "./style.css";

const Home = () => {
  return (
    <Fragment>
      <NavBar />
      <div className="home-content">
        <Switch>
          <Route path="/home/status" />
          <Route path="/home/analytics"></Route>
        </Switch>
      </div>
    </Fragment>
  );
};

export default Home;
