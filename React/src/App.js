import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

 function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
          <li>
              <Link to="/">Log In</Link>
            </li>
          <li>
              <Link to="/register">Register</Link>
            </li>
          <li>
              <Link to="/forgotPassword">Admin</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/analysis">Analysis</Link>
            </li>
            <li>
              <Link to="/status">Status</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact={true} path="/">
            <h1>login</h1>
          </Route>
          <Route path="/register">
          <h1>register</h1>
          </Route>
          <Route path="/forgotPassword">
          <h1>forgotPassword</h1>
          </Route>
          <Route path="/admin">
          <h1>Admin</h1>
          </Route>
          <Route path="/analysis">
          <h1>Analysis</h1>
          </Route>
          <Route path="/status">
          <h1>status</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;