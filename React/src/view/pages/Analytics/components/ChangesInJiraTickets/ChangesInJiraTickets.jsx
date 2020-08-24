import React from 'react';
import "./ChangesInJiraTickets.css";
import Chart from "../charts/Chart";

import { useState } from 'react';


function ChangesInJiraTickets(props) {

  const [UiObjs, setUiObjs] = useState([]);

  const prepareDate = d => {
    let y;
    let m;
    [y, m, d] = d.split("-"); //Split the string
    return [y, m - 1, d]; //Return as an array with y,m,d sequence
  }

  const handleFilter = e => {
    e.preventDefault();
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const status = e.target.status.value;
    const oldNew = e.target.oldNew.value;
    const label = e.target.label.value;
    const dateToSendStart = new Date(...prepareDate(startDate)).getTime();
    const dateToSendEnd = new Date(...prepareDate(endDate)).getTime();
    if (label === "day") {
      fetch('/getUpdatedTasksByStatusDaily', {
        method: 'POST',
        body: JSON.stringify({ status,oldNew, dateToSendEnd, dateToSendStart }),

        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => { setUiObjs(data) })

    }
    if (label === "month") {
      fetch('/getUpdatedTasksByStatusMonthly', {
        method: 'POST',
        body: JSON.stringify({ status,oldNew, dateToSendEnd, dateToSendStart }),

        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => { setUiObjs(data) })

    }
    if (label === "year") {
      fetch('/getUpdatedTasksByStatusYearly', {
        method: 'POST',
        body: JSON.stringify({ status,oldNew, dateToSendEnd, dateToSendStart }),

        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => { setUiObjs(data) })

    }




  }




  return (
    <div className='ChangeOfJiraTicketWrapper'>
      <div className="ChangeOfJiraTicket__Title">Changes Of Jira Tickets</div>
      <div className="ChangeOfJiraTicket__Chart">
        {UiObjs &&

          <Chart UiObjs={UiObjs} />
        }
      </div>
      <form onSubmit={handleFilter} className="ChangeOfJiraTicket__Filters">
        <select name="oldNew" className="ChangeOfJiraTicket__Filters--option" required>
        <option value="none" selected disabled hidden> 
          old/new:
         </option>
          <option name="newValue" value="newValue">newValue</option>
          <option name="oldValue" value="oldValue">oldValue</option>

        </select>
     <select name="status" className="ChangeOfJiraTicket__Filters--option" required>

         <option value="none" selected disabled hidden> 
          Choose a status:
         </option> 
         <option name="in-progress">In Progress</option>
         <option name=" Backlog">Backlog</option>         
         <option name="Done">Done</option>

      </select>

        <input className="ChangeOfJiraTicket__Filters--option" type="date" name="startDate" required></input>

        <input className="ChangeOfJiraTicket__Filters--option" type="date" name="endDate" required></input>

        <select name="label" className="ChangeOfJiraTicket__Filters--option" required>
          <option value="" >Label </option>
          <option value="day">Daily</option>
          {/* <option value="week">Weekly</option> */}
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
        <button className="ChangeOfJiraTicket__Filters--submit" type="submit"> submit</button>
      </form>

      {/* <div className="chart_Colors">
          <div className="chart_Colors_Status">Done</div>
          <div className="chart_Colors_Priority">Priority</div>
          <div className="chart_Colors_QaRepresentative">QaRep</div>
        </div> */}

    </div>
  )

}


export default ChangesInJiraTickets;