import React from 'react';
import "./DelaysInDelivery.css";
import Select from 'react-select'
import { useState, useEffect,useRef } from 'react';
import Chart from "../charts/Chart"
let serverFilters = {
  fixVersion: [],
  jiraType: [],
  qaRepresentative: [],
  startDate: "",
  endDate: "",
  label: []
};

function DelaysInDelivery() {


   const [UiObjs, setUiObjs] = useState([]);

  // Options To get From Server 
  const [fixVersionOptions, setfixVersionOptions] = useState([])
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([])

  const [jiraTypeOptions, setJiraTypeOptions] = useState([
    {  value: "Create", label: "Create" },
    {  value: "Deleted", label: "Deleted" },
    {  value: "Update", label: "Update" },
  ])


  const [labelOptions, setLabelOptions] = useState([
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" }
  ])

  // Functions ==> Fetch : 
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
        setUiObjs(data) })

  }

  useEffect(() => {
    let startDate = new Date()
    let endDate = new Date()
    startDate.setMonth(endDate.getMonth() - 1)
    const timeZone = startDate.getTimezoneOffset()/60

    startDate.setHours(0-timeZone, 0, 0, 0)
    endDate.setHours(0-timeZone, 0, 0, 0)
     serverFilters = {
      fixVersion: [],
      jiraType: [],
      qaRepresentative: [],
      startDate: startDate,
      endDate: endDate,
      label: ["daily"]
    };

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
        if(data.length>0){
        setfixVersionOptions(data[0].fixVersion)}
        else {
          alert("no data received from the server... ")
        }

      })
    },[])

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
          if(data.length>0){
          setQaRepresentativeOptions(data[0].qa); }
          else {
            alert("no data received for (Qa) from the server... ")
          }
        })
  
    }



    const HandlefixVersionChange = (version => {
      serverFilters.jiraType=[]
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
   

  const HandlejiraTypeChange = (type => {
    serverFilters.jiraType=[]

    if(type!=null){
      type.map((item, index) => {
        return serverFilters.jiraType.push(item.value)
      })}

      else {
        serverFilters.jiraType=[]
      }
    render(serverFilters);
  })

  const HandleqaRepresentativeChange = (Qa => {
    serverFilters.qaRepresentative = []
    if(Qa!=null){
    Qa.map((item, index) => {
      return serverFilters.qaRepresentative.push(item.value)
    })}
    else {
      serverFilters.qaRepresentative=[]
    }

    render(serverFilters);
  })


  const HandleStartDateChange = (date => {
    serverFilters.startDate = (date.target.value);
    render(serverFilters);
  })
  const HandleEndDateChange = (date => {
    serverFilters.endDate = (date.target.value);
    render(serverFilters);
  })
  const HandleLabelChange = (label => {
    serverFilters.label = [label.value];
    render(serverFilters);
  })

  const jiraTypeInput=useRef("")
  const qaInput=useRef("")

  return (

    <div className='DelaysInDeliveryWrapper'>
       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
       <div className="DelaysInDelivery__Chart"> {UiObjs && <Chart UiObjs={UiObjs} />}</div>
       <div className="DelaysInDelivery__Title">Delays in Delivery</div>

      {/* Select Filters */}

      <form className="DelaysInDelivery__Filters">

        <Select
          name="fixVersion"
          onInputChange={()=> {jiraTypeInput.current.state.value="";qaInput.current.state.value=""}}
          options={fixVersionOptions}
          placeholder="fix Version "
          className="DelaysInDelivery__Filter"
          onChange={HandlefixVersionChange}
          isClearable={true}

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

        <input
          className="DelaysInDelivery__Filter__date"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />

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