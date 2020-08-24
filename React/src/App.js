import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/common/NavBar/index";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/forgotPassword">
            /** add relevant component here (i'm not sure that forgotPassword
            should be a route) */
          </Route>
          <Route path="/admin">/* add Admin component here*/</Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">/* add Register component here*/</Route>
          <Route path="/">/* add Login component here*/</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
