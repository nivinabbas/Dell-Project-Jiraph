import React from "react";

//components
import Nav from "./components/Nav/Nav";

//admin
import Login from "./view/pages/Admin/components/Login/Login";
import ForgetPassword from "./view/pages/Admin/components/ForgetPassword/ForgetPassword";
import StatusPage from "./view/pages/Status/components/StatusPage/StatusPage";

import ChangePassword from "./view/pages/Admin/components/ChangePassword/ChangePassword";
import KeyPassword from "./view/pages/Admin/components/KeyPassword/KeyPassword";
import UserList from "./view/pages/Admin/components/usersList/UserList";
import Audit from "./view/pages/Admin/components/Audit/Audit";

import ModificationByField from "./view/pages/Analytics/components/Pages/ModificationByField/ModificationByField";
import DeletedJiraTickets from "./view/pages/Analytics/components/Pages/DeletedJiraTickets/DeletedJiraTickets";
import ChangesInJiraTickets from "./view/pages/Analytics/components/Pages/ChangesInJiraTickets/ChangesInJiraTickets";
import ChangesByParentId from "./view/pages/Analytics/components/Pages/ChangesByParentId/ChangesByParentId";
import DelaysInDelivery from "./view/pages/Analytics/components/Pages/DelaysInDelivery/DelaysInDelivery";


import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useLocation,
  useParams ,
  HashRouter
} from "react-router-dom";
import { createBrowserHistory } from "history";


function App() {
  // let location = useLocation();
  // console.log(location);
const history = createBrowserHistory();
  return (
    <HashRouter>
      <div className="app">
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <Nav />
        <div className="mainPage">
          <Switch>
            <Route exact={true} path="/">
              <Login />
            </Route>
            
          
            <Route path="/register"></Route>
            <Route path="/forgotPassword">
              <ForgetPassword />
            </Route>
           

            <Route path="/KeyPassword/:email" children={<KeyPassword  />} />

              <Route path="/ChangePassword/:email" children={<ChangePassword  />} />


            <Route path="/Admin" history={history}>
              <UserList />
            </Route>
            <Route path="/Audit">
              <Audit />
            </Route>
            <Route path="/status">
              <StatusPage />
            </Route>
            <Route path="/analysis">
            <ModificationByField />
            </Route>
            
            <Route path="/ModificationByField" >
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
    </HashRouter>
  );
}

export default App;
