import React from 'react';
import { useState, useEffect, useRef } from 'react';
import "./ChangesInJiraTickets.css";

//Components 
import Select from 'react-select'
import Chart from "../charts/Chart"


// Filters To Send To Server 
let serverFilters = {
  values: [],
  status: [],
  qaRepresentative: [],
  startDate: "",
  endDate: "",
  label: []
};

function ChangesInJiraTickets() {


  // Functions ==> Fetch : 

  //On Page opening
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
      values: ["newValue"],
      status: [],
      qaRepresentative: [],
      startDate: startDate,
      endDate: endDate,
      label: ["weekly"]
    };

    //fetch to receive Available Filters options from server by date
    fetch('/api/analytics/changeOfJIRATicketsStatusFilters', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setStatusOptions(data[0].status)
          setQaRepresentativeOptions(data[0].qa)
        }
        else {
          alert("No Available Filters From The Server Check The connection / Change date")
        }
      })

    //fetch to receive Data (UiObj) from the server
    fetch('/api/analytics/changeOfJIRATicketsStatus', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setUiObjs(data)

      })

  }, [])

  //fetch to receive Data (UiObj) from server after every filter Change
  const render = (serverFilters) => {
    console.log(serverFilters)
    fetch('/api/analytics/changeOfJIRATicketsStatus', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUiObjs(data)
      })

  }

  // Changes Of Jira Tickets Variables :

  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Options To get From Server 
  const [statusOptions, setStatusOptions] = useState([])
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([])

  // Old / New Value Filter
  const valueOptions = [
    { value: "newValue", label: "New Value" },
    { value: "oldValue", label: "Old Value" }
  ]

  //Labels for Displaying the Chart
  const labelOptions = [
    { name: "label", value: "daily", label: "Daily" },
    { name: "label", value: "weekly", label: "Weekly" },
    { name: "label", value: "monthly", label: "Monthly" },
    { name: "label", value: "yearly", label: "Yearly" }
  ]




   //Filters Changes Handlers
  // for each Filter we have a handler
  // to update serverFilters that we send to server to receive data according to our picks 

  // old/new 
  const HandleValuesChange = (change => {
    serverFilters.qaRepresentative = []
    serverFilters.status = []
    if (change != null) {
      serverFilters.values = [change.value]
    }
    else {
      serverFilters.values = [];
      statusInput.current.state.value = ""; 
      qaInput.current.state.value = ""
    }
    render(serverFilters);
  })

  // Status  => Done / BackLog / In Progress ....  
  const HandleStatusChange = (change => {

    serverFilters.status = []
    if (change != null) (
      change.map((item) => {
        return (
          serverFilters.status.push(item.value)
        )
      }))

    render(serverFilters);
  })

  // Qa Representative  
  const HandleqaRepresentativeChange = (change => {
    serverFilters.qaRepresentative = []
    if (change != null) (
      change.map((item) => {
        return (
          serverFilters.qaRepresentative.push(item.value)
        )
      }))

    render(serverFilters);
  })

  // Dates 
  const HandleStartDateChange = (date => {
    serverFilters.startDate = (date.target.value)
    render(serverFilters);
  })

  const HandleEndDateChange = (date => {
    let endDate =new Date(date.target.value)
    const timeZone = (endDate.getTimezoneOffset() / 60);
    endDate.setHours((0 - timeZone)+(23), 59, 59, 59);
    serverFilters.endDate = endDate;
    render(serverFilters);
  })

  // Label 
  const HandleLabelChange = (label => {
    serverFilters.label = [label.value]

    render(serverFilters);
  })

  //We Use UseRef to clear other filters when we pick Main Filter
  const statusInput = useRef("")
  const qaInput = useRef("")


  return (

    <div className='ChangeOfJiraTicketWrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>

      {/* Here We Call the Chart Component if we have a uiObj ready */}

      <div className="ChangeOfJiraTicket__Chart">
        {UiObjs && <Chart UiObjs={UiObjs} title="Changes In Jira Ticket Status (All)"/>}
      </div>

      <div className="ChangeOfJiraTicket__Title">Changes Of Jira Tickets</div>

      <div className="ModificationByField__Filters__wrapper">
       

        <form className="ChangeOfJiraTicket__Filters__fields">
        <div className="ChangeOfJiraTicket__Filters__Header">
        <p> Old/New  </p>
        <Select
          onInputChange={() => { statusInput.current.state.value = ""; qaInput.current.state.value = "" }}
          name="oldNew"
          options={valueOptions}
          placeholder="New value"
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleValuesChange}
          isClearable={true}/>
        </div>

        <div className="ChangeOfJiraTicket__Filters__Header">
        <p> Status </p>
        <Select
          name="status"
          ref={statusInput}
          isMulti
          options={statusOptions}
          placeholder="Status "
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleStatusChange}/>
          </div>

        <div className="ChangeOfJiraTicket__Filters__Header">
        <p> Qa Representative</p>
        <Select
          name="qaRepresentative"
          isMulti
          ref={qaInput}
          options={qaRepresentativeOptions}
          placeholder="Qa Representative "
          className="DelaysInDelivery__Filter"
          onChange={HandleqaRepresentativeChange}/>
          </div>
       
        <div className="ChangeOfJiraTicket__Filters__Header">
        <p> Start Date </p>
        <input
          className="ChangeOfJiraTicket__Filter__date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={HandleStartDateChange}/>
        </div>

        <div className="ChangeOfJiraTicket__Filters__Header">
        <p> End Date </p>
        <input
          className="ChangeOfJiraTicket__Filter__date"
          type="date"
          name="endDate"
          value={endDate}
          onChange={HandleEndDateChange}/>
          </div>

        <div className="ChangeOfJiraTicket__Filters__Header">
        <p> Period </p>
        <Select
          name="labels"
          options={labelOptions}
          placeholder="Weekly"
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleLabelChange}
        />
        </div>

      </form>
    </div>
    </div>
  )

}


export default ChangesInJiraTickets;