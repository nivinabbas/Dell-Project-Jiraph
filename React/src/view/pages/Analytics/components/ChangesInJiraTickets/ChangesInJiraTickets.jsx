import React from 'react';
import { useState, useEffect,useRef } from 'react';
import "./ChangesInJiraTickets.css";

//Components 
import Select from 'react-select'
import Chart from "../charts/Chart"
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

<<<<<<< HEAD

// Options To Send == > Server 
const serverFilters = {
  values: [],
  status: [],
  qaRepresentative: [],
  startDate: "",
  endDate: "",
  label: ["weekly"]
};

function ChangesInJiraTickets() {

=======
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

>>>>>>> Rami

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

  const valueOptions=[
    { value: "newValue", label: "New Value" },
    { value: "oldValue", label: "Old Value" }
  ]
<<<<<<< HEAD
=======

  const labelOptions=[
    { name: "label", value: "daily", label: "Daily" },
    { name: "label", value: "weekly", label: "Weekly" },
    { name: "label", value: "monthly", label: "Monthly" },
    { name: "label", value: "yearly", label: "Yearly" }
  ]


>>>>>>> Rami

  const labelOptions=[
    { name: "label", value: "daily", label: "Daily" },
    { name: "label", value: "weekly", label: "Weekly" },
    { name: "label", value: "monthly", label: "Monthly" },
    { name: "label", value: "yearly", label: "Yearly" }
  ]



  
  // Filters onChange Functions 

  const HandleValuesChange = (change => {
<<<<<<< HEAD
    serverFilters.qaRepresentative=[]
    serverFilters.status=[]
    if(change!=null){
    serverFilters.values = [change.value]
    }
    else {
      serverFilters.values=[]
    }
=======
    serverFilters.values = [change.value]
>>>>>>> Rami
    render(serverFilters);
  })


  const HandleStatusChange = (change => {

    serverFilters.status = []
    if(change!=null)(
    change.map((item) => {
      return(
      serverFilters.status.push(item.value)
      )
    }))

    render(serverFilters);
  })

  const HandleqaRepresentativeChange = (change => {
    serverFilters.qaRepresentative = []
    if(change!=null)(
      change.map((item) => {
        return(
      serverFilters.qaRepresentative.push(item.value)
        )
    }))

    render(serverFilters);
  })

  const HandleStartDateChange = (date => {
    serverFilters.startDate = (date.target.value)
    render(serverFilters);
  })

  const HandleEndDateChange = (date => {
    serverFilters.endDate = (date.target.value)
    render(serverFilters);
  })

  const HandleLabelChange = (label => {
    serverFilters.label = [label.value]

    render(serverFilters);
  })

<<<<<<< HEAD
  
  const statusInput=useRef("")
  const qaInput=useRef("")
=======
>>>>>>> Rami


  return (

    <div className='ChangeOfJiraTicketWrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>

      <div className="ChangeOfJiraTicket__Chart">
        {UiObjs.length > 0 && <Chart UiObjs={UiObjs} />}
      </div>

      <div className="ChangeOfJiraTicket__Title">Changes Of Jira Tickets</div>

      {/* Select Filters */}

      <form className="ChangeOfJiraTicket__Filters">

        <Select 
          onInputChange={()=> {statusInput.current.state.value="";qaInput.current.state.value=""}}
          name="oldNew"
          options={valueOptions}
          placeholder="old/new "
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleValuesChange}
          isClearable={true}
        />

<<<<<<< HEAD
        <Select 
=======
        <Select
>>>>>>> Rami
          name="status"
          ref={statusInput}
          isMulti
          options={statusOptions}
          placeholder="Status "
          className="ChangeOfJiraTicket__Filter"
          onChange={HandleStatusChange}
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
          className="ChangeOfJiraTicket__Filter__date"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />

        <input
          className="ChangeOfJiraTicket__Filter__date"
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