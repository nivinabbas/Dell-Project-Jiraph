import React from 'react';
import "./ChangesInJiraTickets.css";
import MainTable from "../MainTable/MainTable"
import Select from 'react-select'

import { useState, useEffect } from 'react';


function ChangesInJiraTickets() {
  
  // Default Date
  const date = new Date()
  const date1MonthAgo = new Date(new Date().setMonth(date.getMonth() - 1));

  // Options To Send == > Server 
  const serverFilters = {
    values: [],
    status: [],
    qaRepresentative: [],
    startDate: [], // date1MonthAgo
    endDate: [], // date
    label: ["weekly"]
  };


  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);

  // Options To get From Server 

  const [statusOptions, setStatusOptions] = useState([])
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([])

  const [valueOptions, setValueOptions] = useState([
    { value: "newValue", label: "New Value" },
    { value: "oldValue", label: "Old Value" }
  ])

  const [labelOptions, setLabelOptions] = useState([
    { name: "label", value: "Daily", label: "Daily" },
    { name: "label", value: "Weekly", label: "Weekly" },
    { name: "label", value: "Monthly", label: "Monthly" },
    { name: "label", value: "Yearly", label: "Yearly" }
  ])


  // Functions ==> Fetch : 

   useEffect(() => {

    fetch('/api/analytics/changeOfJIRATicketsStatusFilters')
      .then(res => res.json())
      .then(data => {

        //set state (UiObj)
        setStatusOptions(data.tasks[0].labels);
      })
      fetch('/api/analytics/changeOfJIRATicketsStatusFilters')
      .then(res => res.json())
      .then(data => {

        //set state (UiObj)
        setQaRepresentativeOptions(data.QA[0].qa);
      })

  }, [])


  const render = (serverFilters) => {
    fetch('/api/analytics/changeOfJIRATicketsStatus', {
      method: 'POST',
      body: JSON.stringify(serverFilters ),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => { console.log(data) })

  }

  /*  const getFiltersValues = () => {
      fetch('/api/analytics/ChangesInJiraTicketsFilters')
      
        .then((res) => res.json())
        .then((data) => {
          data.map(array =>{
            
          })
         })
  
    }*/



  // Filters onChange Functions 

  const HandleValuesChange = (val => {
    serverFilters.values = [val.value]
    render(serverFilters);
  })


  const HandleStatusChange = (status => {
    serverFilters.status = [status.label]
    render(serverFilters);
  })

  const HandleqaRepresentativeChange = (Qa => {
    serverFilters.qaRepresentative = [Qa.label]
    render(serverFilters);
  })

  const HandleStartDateChange = (date => {
    serverFilters.startDate = [date.target.value]
    render(serverFilters);
  })

  const HandleEndDateChange = (date => {
    serverFilters.endDate = [date.target.value]
    render(serverFilters);
  })

  const HandleLabelChange = (label => {
    serverFilters.label = [label.value]
    render(serverFilters);
  })

  return (

    <div className='ChangeOfJiraTicketWrapper'>
      <div className="ChangeOfJiraTicket__Table" >
        <MainTable changes={true} />

      </div>

      <div className="ChangeOfJiraTicket__Title">Changes Of Jira Tickets</div>

      {/* Select Filters */}

      <form className="ChangeOfJiraTicket__Filters">

        <Select
          name="oldNew"
          options={valueOptions}
          placeholder="old/new "
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleValuesChange}
        />

        <Select
          name="status"
          isMulti
          options={statusOptions}
          placeholder="Status "
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleStatusChange}
        />

        <Select
          name="qaRepresentative"
          isMulti
          options={qaRepresentativeOptions}
          placeholder="Qa Representative "
          className="DelaysInDelivery__Filter"
          onChange={HandleqaRepresentativeChange}
        />

        <input
          className="ChangeOfJiraTicket__Filter"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />

        <input
          className="ChangeOfJiraTicket__Filter"
          type="date"
          name="endDate"
          onChange={HandleEndDateChange}
        />

        <Select
          name="labels"
          options={labelOptions}
          placeholder="Label"
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleLabelChange}
        />

      </form>
    </div>
  )

}


export default ChangesInJiraTickets;