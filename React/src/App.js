import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../src/view/pages/Home";

import MainPage from './view/pages/Analytics/components/MainPage/MainPage'

 function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/forgotPassword">
            <h1>forget</h1>
          </Route>
          <Route path="/admin">
            <h1>admin</h1>
          </Route>
          <Route path="/analysis">
          <MainPage />
          </Route>
          <Redirect from="/" exact to="/home/status" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
