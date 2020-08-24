import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar/index";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact={true} path="/" />
          <Route path="/register" />
          <Route path="/forgotPassword" />
          <Route path="/admin" />
          <Route path="/analysis" />
          <Route path="/status" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
