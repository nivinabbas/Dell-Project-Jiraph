import React from "react";
import Login from "./view/pages/Admin/components/Login/Login"
import UserList from "./view/pages/Admin/components/usersList/UserList"

import ForgetPassword from "./view/pages/Admin/components/ForgetPassword/ForgetPassword";
import KeyPassword from "./view/pages/Admin/components/KeyPassword/KeyPassword";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useParams

} from "react-router-dom";
import ChangePassword from "./view/pages/Admin/components/ChangePassword/ChangePassword";



function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>

            <li>
              <Link to="/register">Register</Link>

            </li>

            <li>
              <Link to="/userlist">Admin</Link>
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
            <Login></Login>

          </Route>
          <Route path="/register">

          </Route>
          <Route path="/forgotPassword">
            <ForgetPassword></ForgetPassword>
          </Route>
          <Route path="/KeyPassword/:email" children={<KeyPassword  />} />
          <Route path="/ChangePassword">
            <ChangePassword></ChangePassword>
          </Route>
          <Route path="/ChangePassword/:email" children={<ChangePassword  />} />
          
          <Route path="/userlist">
           <UserList />

          </Route>
          <Route path="/analysis">

          </Route>
          <Route path="/status">

          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
