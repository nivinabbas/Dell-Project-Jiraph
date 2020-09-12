import React from 'react';
import "./DeletedJiraTickets.css";
import Chart from "../charts/Chart";
import Select from 'react-select';
import { useState, useEffect } from 'react';

//Server Filters to receive Data
let serverFilters = { priority: [], functionalTest: [], label: [], qaRepresentative: [], startDate: "", endDate: "" };

function DeletedJiraTickets() {

  //On Page Opening
  useEffect(() => {
    //Building Start and End date for last month (Default)
    let startDate = new Date()
    let endDate = new Date()
    startDate.setMonth(endDate.getMonth() - 1)
    const timeZone = startDate.getTimezoneOffset() / 60
    startDate.setHours(0 - timeZone, 0, 0, 0)
    endDate.setHours(0 - timeZone, 0, 0, 0)

    //Default Server Filters to receive Data
    serverFilters = {
      priority: [],
      functionalTest: [],
      label: ["daily"],
      qaRepresentative: [],
      startDate: startDate,
      endDate: endDate
    };
     //fetch to receive Data (UiObj) from server
    fetch('/api/analytics/deletedJiraTickets', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data != null) { setUiObjs(data); }
        else { setUiObjs([]); }
      })

    //fetch to receive Available Filters options from server by date
    fetch('/api/analytics/deletedJiraTicketsFilters', {
      method: 'POST',
      body: JSON.stringify({ startDate: serverFilters.startDate, endDate: serverFilters.endDate, label: serverFilters.label }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setPriorityOptions(data[0].priorities)
          setQaRepresentativeOptions(data[0].QA)
        }
        else {
          alert("No Available Filters From The Server Check The connection / Change date")
        }
      })
  }
    , [])

  //fetch to receive Data (UiObj) from server after every filter Change
  const render = (serverFilters) => {
    fetch('/api/analytics/deletedJiraTickets', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => { if (data != null) { setUiObjs(data); }
      else { setUiObjs([]); } })
  }


  //Deleted Jira TicketsVariables
  const [UiObjs, setUiObjs] = useState([]); //UiObject from the server

  // Options To get From Server 
  const [priorityOptions, setPriorityOptions] = useState([]);//proiority options for filters
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([]);//Qa Representative options for filters
  const functionalTestOptions = [//functionalTest options for filters
    { name: "functionalTest", value: "true", label: "True" },
    { name: "functionalTest", value: "false", label: "False" },
  ]

  const labelOptions = [//Label options for filters
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" }]



  //Filters Changes Handlers
  // for each Filter we have a handler
  // to update serverFilters that we send to server to receive data according to our picks

  //priority:
  const HandlePriorityChange = (change => {
    serverFilters.functionalTest = [];
    serverFilters.qaRepresentative = [];
    serverFilters.priority = [];
    if (change != null) (
      change.map((item) => {
        return (
          serverFilters.priority.push(item.value)
        )
      }))
    render(serverFilters);
  })
  //functionaltest
  const HandlefunctionalTestChange = (change => {
    serverFilters.functionalTest = [];
    if (change != null) (
      change.map((item) => {
        return (
          serverFilters.functionalTest.push(item.value)
        )
      }))
    render(serverFilters);
  })
  //Qa Representative:
  const HandleqaRepresentativeChange = (change => {
    serverFilters.qaRepresentative = [];
    if (change != null) (
      change.map((item) => {
        return (
          serverFilters.qaRepresentative.push(item.value)
        )
      }))
    render(serverFilters);
  })
  ///Start Date:
  const HandleStartDateChange = (change => {
    serverFilters.startDate = new Date(change.target.value);
    render(serverFilters);
  })
  //End Date:
  const HandleEndDateChange = (change => {
    serverFilters.endDate = new Date(change.target.value);
    render(serverFilters);
  })
  //Label:
  const HandleLabelChange = (label => {
    serverFilters.label = [label.value];
    render(serverFilters);
  })
  return (
    <div className='DeletedJiraTicketsWrapper'>
      <div className="DeletedJiraTickets__Chart"> {UiObjs && <Chart UiObjs={UiObjs} />}</div>
      <div className="DeletedJiraTickets__Title">Deleted Jira Tickets</div>
      {/* Select Filters */}
      <form className="DeletedJiraTickets__Filters">
        {/* select */}

        <Select
          name="priority"
          isMulti
          options={priorityOptions}
          placeholder="priority "
          className="DeletedJiraTickets__Filter"
          onChange={HandlePriorityChange}
        />

        <Select
          name="functional test"
          isMulti
          options={functionalTestOptions}
          placeholder="functional-Test "
          className="DeletedJiraTickets__Filter"
          onChange={HandlefunctionalTestChange}
        />

        <Select
          name="qaRepresentative"
          isMulti
          options={qaRepresentativeOptions}
          placeholder="Qa Representative"
          className="DeletedJiraTickets__Filter"
          onChange={HandleqaRepresentativeChange}
        />
        From
        <input
          className="DeletedJiraTickets__Filter__date"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />

        To
        <input
          className="DeletedJiraTickets__Filter__date"
          type="date"
          name="endDate"
          onChange={HandleEndDateChange}
        />

        <Select
          name="labels"
          options={labelOptions}
          placeholder="Label"
          className="DeletedJiraTickets__Filter"
          onChange={HandleLabelChange}
        />
      </form>
    </div>
  )
}




export default DeletedJiraTickets;