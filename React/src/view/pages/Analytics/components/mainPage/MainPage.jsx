import React from 'react';
import "./MainPage.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";
import ModificationByField from "../ModificationByField/ModificationByField";
// import DeletedJiraTickets from "../DeletedJiraTickets/DeletedJiraTickets";
// import ChangesInJiraTickets from "../ChangesInJiraTickets/ChangesInJiraTickets";
import ChangesByParentId from "../ChangesByParentId/ChangesByParentId";
import DelaysInDelivery from "../DelaysInDelivery/DelaysInDelivery";



function MainPage(props){

return(
  <Router>
      <div>
        <nav>
          <ul>

          <li>
              <Link className="MainForm__status--btn" to="/ModificationByField">ModificationByField</Link>

            </li>

            {/* <li>
              <Link className="MainForm__status--btn" to="/DeletedJiraTickets">Deleted Jiras</Link>
            </li>
            <li>
              <Link className="MainForm__status--btn" to="/ChangesInJiraTickets">Changes In Jira Tickets</Link>
            </li> */}
            <li>
              <Link className="MainForm__status--btn" to="/ChangesInParentID">Changes In Parent ID</Link>
            </li>
            <li>
              <Link className="MainForm__status--btn" to="/DelaysInDelivery">Delays In Delivery</Link>
            </li>

          </ul>
        </nav>
        <Switch>
        <Route path="/ModificationByField">
            <ModificationByField/>
          </Route>
          {/* <Route path="/DeletedJiraTickets">
            <DeletedJiraTickets/>
          </Route>
          <Route path="/ChangesInJiraTickets">
             <ChangesInJiraTickets/>
          </Route> */}
          <Route path="/ChangesInParentID">
            <ChangesByParentId/>
          </Route>
          <Route path="/DelaysInDelivery">
          <DelaysInDelivery/>
          </Route>
          
        </Switch>
      </div>
    </Router>

  // <div className='MainForm'>

  //     <div className="MainForm__status">
  //           <button className="MainForm__status--btn"> Status </button>
  //     </div>

  //     <div className="MainForm__analytics">
  //           <button className="MainForm__analytics--btn"> Analytics </button>
  //     </div>

    
  //   <div className="MainForm__changesOfJiraTickets">

  //     <button className="MainForm__changesOfJiraTickets--btn" onClick={()=>{
  //       history.push('/aa')}}>   Changes Of Jira Tickets  </button>
  //   </div>

  //   <div className="MainForm__ModificationByField">
  //     <button className="MainForm__ModificationByField--btn"> Changes Of Jira Tickets</button>
  //   </div>

  //   <div className="MainForm__DeletedJiraTickets">
  //     <button className="MainForm__DeletedJiraTickets--btn"> Deleted Of Jira Tickets</button>
  //   </div>
    
  //   <div className="MainForm__DelaysInDelievry">
  //     <button className="MainForm__DelaysInDelievry--btn"> Delays Of Jira Tickets</button>
  //   </div>


  //   <Switch>

  //         <Route path="/aa">
  //           <h1>Changes</h1>
  //         </Route>

  //         <Route path="/Modification">
  //         <h1>Modification</h1>
  //         </Route>

  //         <Route path="/Deleted">
  //           ssss
  //         </Route>

  //         <Route path="/Delays">
  //           ssss
  //         </Route>

  //   </Switch>


  //   </div>


 
  
  // </Router>
)

}


export default MainPage ;