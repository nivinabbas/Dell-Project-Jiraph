import React from "react";

//components
import Login from "./view/pages/Admin/components/Login/Login"
import ForgetPassword from "./view/pages/Admin/components/ForgetPassword/ForgetPassword";
import MainPage from "./view/pages/Analytics/components/MainPage/MainPage";
import ModificationByField from "./view/pages/Analytics/components/ModificationByField/ModificationByField";
import DeletedJiraTickets from "./view/pages/Analytics/components/DeletedJiraTickets/DeletedJiraTickets";
import ChangesInJiraTickets from "./view/pages/Analytics/components/ChangesInJiraTickets/ChangesInJiraTickets";
import ChangesByParentId from "./view/pages/Analytics/components/ChangesByParentId/ChangesByParentId";
import DelaysInDelivery from "./view/pages/Analytics/components/DelaysInDelivery/DelaysInDelivery";

import "./App.css"
import logo from "./JiraphLogo.jpg"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link

} from "react-router-dom";



function App() {


  return (
    <Router>
      <div className='app'>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        <nav className="sidebar">

          <div className="sidebar__header-wrapper">
            <img className="jiraph__logo" src={logo} alt="this is a logo" />
           JIRAPH
          </div>

          <div className="menu__wrapper">

            <div className="menu__item">
              <Link className="menu__link" to="/register">Register</Link>
            </div>
            <div className="menu__item">
              <Link className="menu__link" to="/Admin">Admin</Link>
            </div>

            <div className="menu__item">
              <Link className="menu__link" to="/status">Status</Link>
            </div>

            <div className="menu__item">
              <Link className="menu__link" to="/analysis">Analysis</Link>
              <div className="analysis-options">

                <div className="analysis__item">
                  <Link className="MainForm__status--btn" to="/ModificationByField">Modification By Field</Link>

                </div>

                <div className="analysis__item">
                  <Link className="MainForm__status--btn" to="/DeletedJiraTickets">Deleted Jiras</Link>
                </div>
                <div className="analysis__item">
                  <Link className="MainForm__status--btn" to="/ChangesInJiraTickets">Changes In Jira Tickets</Link>
                </div>
                <div className="analysis__item">
                  <Link className="MainForm__status--btn" to="/ChangesInParentID">Changes In Parent ID</Link>
                </div>
                <div className="analysis__item">
                  <Link className="MainForm__status--btn" to="/DelaysInDelivery">Delays In Delivery</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar__footer">
            FOOTER
          </div>
        </nav>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
              <DeletedJiraTickets />
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
