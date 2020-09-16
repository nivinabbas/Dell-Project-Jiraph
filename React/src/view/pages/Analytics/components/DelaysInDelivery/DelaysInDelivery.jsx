import React from 'react';
import { useState, useEffect, useRef } from 'react';
import "./DelaysInDelivery.css";

//Components 
import Select from 'react-select'
import Chart from "../charts/Chart"


// Filters To Send To Server 
let serverFilters = {
  fixVersion: [],
  jiraType: [],
  qaRepresentative: [],
  startDate: "",
  endDate: "",
  label: []
};

function DelaysInDelivery() {

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
      fixVersion: [],
      jiraType: [],
      qaRepresentative: [],
      startDate: startDate,
      endDate: endDate,
      label: ["weekly"]
    };

    //fetch to receive Available Filters options from server by date
    fetch('api/analytics/delaysInDeliveryFilters', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setfixVersionOptions(data[0].fixVersion)
        }
        else {
          alert("no data received from the server... ")
        }

      })
  }, [])

  // Functions ==> Fetch : 
  //fetch to receive Data (UiObj) from the server
  const render = (serverFilters) => {
    fetch('api/analytics/delaysInDelivery', {
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

  //fetch to receive Available Filters options from server by date
  const renderFilters = (serverFilters) => {
    fetch('api/analytics/delaysInDeliveryFilters', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setQaRepresentativeOptions(data[0].qa);
        }
        else {
          alert("no data received for (Qa) from the server... ")
        }
      })

  }


  // Delays in Delivery Variables :

  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Options To get From Server 
  const [fixVersionOptions, setfixVersionOptions] = useState([])
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([])

  //Jira Type Filter
  const jiraTypeOptions = [
    { value: "Create", label: "Create" },
    { value: "Delete", label: "Delete" },
    { value: "Update", label: "Update" },
  ]

// Label Filter 
  const labelOptions=[
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" }
  ]



  //Filters Changes Handlers
  // for each Filter we have a handler
 // to update serverFilters that we send to server to receive data according to our picks 


  //Fix Version
  const HandlefixVersionChange = (version => {
    serverFilters.jiraType = []
    serverFilters.qaRepresentative = []
    if (version != null) {
      serverFilters.fixVersion = [version.value]
    }
    else {
      serverFilters.values = []
    }
    render(serverFilters);
    renderFilters(serverFilters);
  })

  // Jira Type 
  const HandlejiraTypeChange = (type => {
    serverFilters.jiraType = []

    if (type != null) {
      type.map((item, index) => {
        return serverFilters.jiraType.push(item.value)
      })
    }

    else {
      serverFilters.jiraType = []
    }
    render(serverFilters);
  })

  // Qa Representative 
  const HandleqaRepresentativeChange = (Qa => {
    serverFilters.qaRepresentative = []
    if (Qa != null) {
      Qa.map((item, index) => {
        return serverFilters.qaRepresentative.push(item.value)
      })
    }
    else {
      serverFilters.qaRepresentative = []
    }

    render(serverFilters);
  })

  // Start Date 
  const HandleStartDateChange = (date => {
    serverFilters.startDate = (date.target.value);
    render(serverFilters);
  })

  // End Date 
  const HandleEndDateChange = (date => {
    let endDate =new Date(date.target.value)
    const timeZone = (endDate.getTimezoneOffset() / 60);
    endDate.setHours((0 - timeZone)+(23), 59, 59, 59);
    serverFilters.endDate = endDate;
    render(serverFilters);
  })

  // Label
  const HandleLabelChange = (label => {
    serverFilters.label = [label.value];
    render(serverFilters);
  })


  //We Use UseRef to clear other filters when we pick Main Filter
  const jiraTypeInput = useRef("")
  const qaInput = useRef("")

  return (

    <div className='DelaysInDeliveryWrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
     
      {/* Here We Call the Chart Component if we have a uiObj ready */}
      <div className="DelaysInDelivery__Chart"> 
      {UiObjs && <Chart UiObjs={UiObjs} title="Delays in Delivery (All)" />}
      </div>

       {/* Page Title */}
      <div className="DelaysInDelivery__Title">Delays in Delivery</div>


      {/* Select Filters */}
      
      <div className="DelaysInDelivery__Filters__wrapper">
       

      <form className="DelaysInDelivery__Filters__fields">

        <div className="DelaysInDelivery__Filters__Header">
        <p> Fix Version </p>
        <Select
          name="fixVersion"
          onInputChange={() => { jiraTypeInput.current.state.value = ""; qaInput.current.state.value = "" }}
          options={fixVersionOptions}
          placeholder="fix Version "
          className="DelaysInDelivery__Filter"
          onChange={HandlefixVersionChange}
        />
        </div>

        <div className="DelaysInDelivery__Filters__Header">
        <p> Jira Type </p>
        <Select
          name="jiraType"
          isMulti
          ref={jiraTypeInput}
          options={jiraTypeOptions}
          placeholder="jira Type  "
          className="DelaysInDelivery__Filter"
          onChange={HandlejiraTypeChange}
        /></div>

<div className="DelaysInDelivery__Filters__Header">
        <p> Qa Representative </p>
        <Select
          name="qaRepresentative"
          isMulti
          ref={qaInput}
          options={qaRepresentativeOptions}
          placeholder="Qa Representative "
          className="DelaysInDelivery__Filter"
          onChange={HandleqaRepresentativeChange}
        /></div>
        
        <div className="DelaysInDelivery__Filters__Header">
        <p> Start Date </p>
        <input
          className="DelaysInDelivery__Filter__date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={HandleStartDateChange}
        />
        </div>

        <div className="DelaysInDelivery__Filters__Header">
        <p> End Date</p>
        <input
          className="DelaysInDelivery__Filter__date"
          type="date"
          name="endDate"
          value={endDate}
          onChange={HandleEndDateChange}
        /></div>

<div className="DelaysInDelivery__Filters__Header">
        <p> Period </p>
        <Select
          name="labels"
          options={labelOptions}
          placeholder="Weekly"
          className="DelaysInDelivery__Filter"
          onChange={HandleLabelChange}
        /></div>

      </form>
    </div>
    </div>
  )

}


export default DelaysInDelivery;