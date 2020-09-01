import React from 'react';
import { useState, useEffect } from 'react';
import "./ChangesInJiraTickets.css";

//Components 
import Select from 'react-select'
import Chart from "../charts/Chart"
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

// Options To Send == > Server 
const serverFilters = {
  values: [],
  status: [],
  qaRepresentative: [],
  startDate: [],
  endDate: [],
  label: ["weekly"]
};

function ChangesInJiraTickets() {


  // Functions ==> Fetch : 

  useEffect(() => {

    fetch('/api/analytics/changeOfJIRATicketsStatusFilters', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setStatusOptions(data[0].status)
        setQaRepresentativeOptions(data[0].qa)

      })

    fetch('/api/analytics/changeOfJIRATicketsStatus', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {

        console.log(data)
        setUiObjs(data)

      })

  }, [])


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
        console.log(data)

        setUiObjs(data)
      })

  }

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
    { name: "label", value: "daily", label: "Daily" },
    { name: "label", value: "weekly", label: "Weekly" },
    { name: "label", value: "monthly", label: "Monthly" },
    { name: "label", value: "yearly", label: "Yearly" }
  ])


  // Default Date
  const date = new Date()
  const date1MonthAgo = new Date(new Date().setMonth(date.getMonth() - 1));



  // Filters onChange Functions 

  const HandleValuesChange = (val => {
    serverFilters.values = [val.value]
    render(serverFilters);
  })


  const HandleStatusChange = (status => {

    serverFilters.status = []
    status.map((item, index) => {
      serverFilters.status.push(item.value)
    })

    render(serverFilters);
  })

  const HandleqaRepresentativeChange = (Qa => {
    serverFilters.qaRepresentative = []
    Qa.map((item, index) => {
      serverFilters.qaRepresentative.push(item.value)
    })

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

      <div className="ChangeOfJiraTicket__Chart">
        {UiObjs.length > 0 && <Chart UiObjs={UiObjs} />}
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