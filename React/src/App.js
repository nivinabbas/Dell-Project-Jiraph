import React from "react";

//components
import Nav from './components/Nav/Nav';
import ForgetPassword from "./view/pages/Admin/components/ForgetPassword/ForgetPassword";
import MainPage from "./view/pages/Analytics/components/mainPage/MainPage";
import ModificationByField from "./view/pages/Analytics/components/ModificationByField/ModificationByField";
import DeletedJira from "./view/pages/Analytics/components/DeletedJiraTickets/Deletedjira";
import ChangesInJiraTickets from "./view/pages/Analytics/components/ChangesInJiraTickets/ChangesInJiraTickets";
import ChangesByParentId from "./view/pages/Analytics/components/ChangesByParentId/ChangesByParentId";
import DelaysInDelivery from "./view/pages/Analytics/components/DelaysInDelivery/DelaysInDelivery";

import "./App.css"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link

} from "react-router-dom";



function App() {
  // let location = useLocation();
  // console.log(location);

  return (
    <Router>
      <div className='app'>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        <Nav />
        <div className='mainPage'>
          <Switch>
            <Route exact={true} path="/">
              <h1>login</h1>
            </Route>
            <Route path="/register">

            </Route>
            <Route path="/forgotPassword">
              <ForgetPassword></ForgetPassword>
            </Route>
            <Route path="/Admin">
              <h1>Admin</h1>

            </Route>
            <Route path="/analysis">
              <MainPage />
            </Route>

            <Route path="/ModificationByField">
              <ModificationByField />
            </Route>
            <Route path="/DeletedJiraTickets">
              <DeletedJira />
            </Route>
            <Route path="/ChangesInJiraTickets">
              <ChangesInJiraTickets />
            </Route>
            <Route path="/ChangesInParentID">
              <ChangesByParentId />
            </Route>
            <Route path="/DelaysInDelivery">
              <DelaysInDelivery />
            </Route>

          </Switch>
        </div>
      </div>
    </Router >
  );
}

export default App;
