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
      label: ["daily"]
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
        console.log(data)
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
        console.log(data)
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

  // Options To get From Server 
  const [fixVersionOptions, setfixVersionOptions] = useState([])
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([])

  //Jira Type Filter
  const [jiraTypeOptions, setJiraTypeOptions] = useState([
    { value: "Create", label: "Create" },
    { value: "Deleted", label: "Deleted" },
    { value: "Update", label: "Update" },
  ])

// Label Filter 
  const [labelOptions, setLabelOptions] = useState([
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" }
  ])



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
      {UiObjs && <Chart UiObjs={UiObjs} />}
      </div>

       {/* Page Title */}
      <div className="DelaysInDelivery__Title">Delays in Delivery</div>


      {/* Select Filters */}
      <form className="DelaysInDelivery__Filters">

        <Select
          name="fixVersion"
          onInputChange={() => { jiraTypeInput.current.state.value = ""; qaInput.current.state.value = "" }}
          options={fixVersionOptions}
          placeholder="fix Version "
          className="DelaysInDelivery__Filter"
          onChange={HandlefixVersionChange}
          

        />

        <Select
          name="jiraType"
          isMulti
          ref={jiraTypeInput}
          options={jiraTypeOptions}
          placeholder="jira Type  "
          className="DelaysInDelivery__Filter"
          onChange={HandlejiraTypeChange}
        />

        <Select
          name="qaRepresentative"
          isMulti
          ref={qaInput}
          options={qaRepresentativeOptions}
          placeholder="Qa Representative "
          className="DelaysInDelivery__Filter"
          onChange={HandleqaRepresentativeChange}
        />
        From
        <input
          className="DelaysInDelivery__Filter__date"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />
        To
        <input
          className="DelaysInDelivery__Filter__date"
          type="date"
          name="endDate"
          onChange={HandleEndDateChange}
        />

        <Select
          name="labels"
          options={labelOptions}
          placeholder="Label"
          className="DelaysInDelivery__Filter"
          onChange={HandleLabelChange}
        />

      </form>
    </div>
  )

}


export default DelaysInDelivery;