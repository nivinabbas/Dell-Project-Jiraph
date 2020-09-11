import React from 'react';
import "./DeletedJiraTickets.css";
import Chart from "../charts/Chart";

import Select from 'react-select';

import { useState, useEffect } from 'react';

let serverFilters = { priority: [], functionalTest: [], label: [], qaRepresentative: [], startDate: "", endDate:""};



function DeletedJiraTickets() {
  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);

  // Options To Send == > Server 





  // Options To get From Server 
  const [priorityOptions, setPriorityOptions] = useState([])
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([])
  const functionalTestOptions = [
    { name: "functionalTest", value: "true", label: "True" },
    { name: "functionalTest", value: "false", label: "False" },
  ]



  const labelOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" }
  ]


  // Functions ==> Fetch : 

  const render = (serverFilters) => {
    fetch('/api/analytics/deletedJiraTickets', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {setUiObjs(data) })

  }


  useEffect(() => {
    let startDate = new Date()
  let endDate = new Date()
  startDate.setMonth(endDate.getMonth() - 1)
  const timeZone = startDate.getTimezoneOffset()/60
  startDate.setHours(0-timeZone, 0, 0, 0)
  endDate.setHours(0-timeZone, 0, 0, 0)
    serverFilters = { priority: [], functionalTest: [], label: ["daily"], qaRepresentative: [],  startDate: startDate, endDate: endDate};

    fetch('/api/analytics/deletedJiraTickets', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUiObjs(data);
       
      })

    fetch('/api/analytics/deletedJiraTicketsFilters', {
      method: 'POST',
      body: JSON.stringify({ startDate: serverFilters.startDate, endDate: serverFilters.endDate,label:serverFilters.label }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.length>0){
        setPriorityOptions(data[0].priorities)
        setQaRepresentativeOptions(data[0].QA)}
        else {
          alert("No data received from the server...")
        }
      })

  }
    , [])

  ///change priority:
  const HandlePriorityChange = (change => {
    serverFilters.functionalTest=[]
    serverFilters.qaRepresentative=[]
    serverFilters.priority = []
    
    if(change!=null)(
      change.map((item)=>{
      return (
      serverFilters.priority.push(item.value)
      )

    }))
    
    render(serverFilters);
  })

  ///change functionaltest
  const HandlefunctionalTestChange = (change => {
    serverFilters.functionalTest = []
    if(change!=null)(
    change.map((item)=>{
      return (
      serverFilters.functionalTest.push(item.value)
      )
    })) 
    render(serverFilters);
  })

  ///change qaRepresentative:
  const HandleqaRepresentativeChange = (change => {
    serverFilters.qaRepresentative = []
    if(change!=null)(
      change.map((item)=>{
        return(
      serverFilters.qaRepresentative.push(item.value)
        )
    }))
    
    render(serverFilters);
  })

  ///change StartDate:
  const HandleStartDateChange = (change => {
   
    serverFilters.startDate = new Date(change.target.value);
    render(serverFilters);
  })

  ///change EndDate:
  const HandleEndDateChange = (change => {
    
    serverFilters.endDate =  new Date(change.target.value);
    render(serverFilters);
  })

  /// change leLabel:
  const HandleLabelChange = (label => {
    console.log(label.value)
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

        <input
          className="DeletedJiraTickets__Filter__date"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />


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