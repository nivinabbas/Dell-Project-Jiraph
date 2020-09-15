import React from 'react';
import "./DeletedJiraTickets.css";
import Chart from "../charts/Chart";
import Select from 'react-select';
import { useState, useRef ,useEffect } from 'react';

//Server Filters to receive Data
let serverFilters = { priority: [], functionalTest: [], label: [], qaRepresentative: [], startDate: "", endDate: "" };

function DeletedJiraTickets() {

  //On Page Opening
  useEffect(() => {
    //Building Start and End date for last month (Default)
    let startDate = new Date()
    let endDate = new Date()
    startDate.setMonth(endDate.getMonth() - 1)
    let endMonth = endDate.getMonth() + 1 < 10 ? `0${endDate.getMonth() + 1}` : endDate.getMonth() + 1;
    let startMonth = startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1;
    setStartDate(`${startDate.getFullYear()}-${startMonth}-${startDate.getDate()}`)
    setEndDate(`${endDate.getFullYear()}-${endMonth}-${endDate.getDate()}`)
    const timeZone = startDate.getTimezoneOffset() / 60
    startDate.setHours(0 - timeZone, 0, 0, 0)
    endDate.setHours(0 - timeZone+23, 59, 59, 59);

    //Default Server Filters to receive Data
    serverFilters = {
      priority: [],
      functionalTest: [],
      label: ["weekly"],
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
    if (change != null) {
      change.map((item) => {
        return (
          serverFilters.priority.push(item.value)
        )
      })}
      else {
        serverFilters.priority=[];
        functionalTestInput.current.state.value = ""; 
        qaInput.current.state.value = ""
      }
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
    let endDate =new Date(change.target.value)
    const timeZone = (endDate.getTimezoneOffset() / 60);
    endDate.setHours((0 - timeZone)+(23), 59, 59, 59);
    serverFilters.endDate = endDate;
    render(serverFilters);
  })
  //Label:
  const HandleLabelChange = (label => {
    serverFilters.label = [label.value];
    render(serverFilters);
  })

  const functionalTestInput = useRef("")
  const qaInput = useRef("")
  return (
    <div className='DeletedJiraTicketsWrapper'>
      <div className="DeletedJiraTickets__Chart"> {UiObjs && <Chart UiObjs={UiObjs} />}</div>
      <div className="DeletedJiraTickets__Title">Deleted Jira Tickets</div>

      <div className="DeletedJiraTickets__Filters__wrapper">
       

      <form className="DeletedJiraTickets__Filters__fields">
        
        <div className="DeletedJiraTickets__Filters__Header">
          <p>Priority</p>
        <Select        
          name="priority"
          onInputChange={() => { functionalTestInput.current.state.value = ""; qaInput.current.state.value = "" }}
          isMulti
          options={priorityOptions}
          placeholder="All"
          className="DeletedJiraTickets__Filter"
          onChange={HandlePriorityChange}
        />
        </div>
        <div className="DeletedJiraTickets__Filters__Header">
          <p>Functional Test </p>
        <Select
          name="functional test"
          isMulti
          ref={functionalTestInput}
          options={functionalTestOptions}
          placeholder="functional-Test "
          className="DeletedJiraTickets__Filter"
          onChange={HandlefunctionalTestChange}
        /></div>

<div className="DeletedJiraTickets__Filters__Header">
          <p>Qa Representative</p>
        <Select
          name="qaRepresentative"
          isMulti
          ref={qaInput}
          options={qaRepresentativeOptions}
          placeholder="Qa Representative"
          className="DeletedJiraTickets__Filter"
          onChange={HandleqaRepresentativeChange}
        /></div>

      <div className="DeletedJiraTickets__Filters__Header">
          <p>Start Date</p>
        <input
          className="DeletedJiraTickets__Filter__date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={HandleStartDateChange}
        />
        </div>


        <div className="DeletedJiraTickets__Filters__Header">
          <p>End Date</p>
        <input
          className="DeletedJiraTickets__Filter__date"
          type="date"
          name="endDate"
          value={endDate}
          onChange={HandleEndDateChange}
        />
        </div>
        <div className="DeletedJiraTickets__Filters__Header">
          <p>Period</p>
        <Select
          name="labels"
          options={labelOptions}
          placeholder="Weekly"
          className="DeletedJiraTickets__Filter"
          onChange={HandleLabelChange}
        />
        </div>
      </form>
    </div>
    </div>
  )
}

      



export default DeletedJiraTickets;