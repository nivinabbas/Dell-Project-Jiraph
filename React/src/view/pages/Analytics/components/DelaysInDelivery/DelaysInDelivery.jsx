import React from 'react';
import "./DelaysInDelivery.css";
import Select from 'react-select'
import { useState, useEffect } from 'react';


function DelaysInDelivery() {
  const serverFilters = { fixVersion: [], jiraType: [], qaRepresentative: [], startDate: [], endDate: [], label: ["weekly"] };

  // const [UiObjs, setUiObjs] = useState([]);

  // Options To get From Server 
  const [fixVersionOptions, setfixVersionOptions] = useState([])
  const [jiraTypeOptions, setJiraTypeOptions] = useState([])
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([])

  const labelOptions = [
    { label: "daily" },
    { label: "weekly" },
    { label: "monthly" },
    { label: "yearly" }
  ];

  // Functions ==> Fetch : 
  const render = (serverFilters) => {
    fetch('/api/analytics/DelaysInDelivery/', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => { console.log(data) })

  }

  useEffect(() => {
    fetch('/api/analytics/')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        //set state (fix Versions => get all the options )
        setfixVersionOptions(data);
      })


  })

  const HandlefixVersionChange = (version => {

    serverFilters.fixVersion = [version.label];


    fetch('/api/analytics/ChangesInJiraTickets/', {
      method: 'POST',
      body: JSON.stringify({ fixVersion: serverFilters.fixVersion }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
            setJiraTypeOptions(data[0].Jira);
            setQaRepresentativeOptions(data[0].QA);
      })
  })

  const HandlejiraTypeChange = (type => {
    serverFilters.JiraType = [type.label];
    render(serverFilters);
  })

  const HandleqaRepresentativeChange = (Qa => {
    serverFilters.qaRepresentative = [Qa.label];
    render(serverFilters);
  })

  const HandleStartDateChange = (date => {
    serverFilters.startDate = [date.target.value];
    render(serverFilters);
  })
  const HandleEndDateChange = (date => {
    serverFilters.endDate = [date.target.value];
    render(serverFilters);
  })
  const HandleLabelChange = (label => {
    serverFilters.label = [label.label];
    render(serverFilters);
  })

  return (

    <div className='DelaysInDeliveryWrapper'>
       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="DelaysInDelivery__Title">Delays in Delivery</div>

      {/* Select Filters */}

      <form className="DelaysInDelivery__Filters">

        <Select
          name="fixVersion"
          options={fixVersionOptions}
          placeholder="fix Version "
          className="DelaysInDelivery__Filter"
          onChange={HandlefixVersionChange}

        />

        <Select
          name="jiraType"
          isMulti
          options={jiraTypeOptions}
          placeholder="jira Type  "
          className="DelaysInDelivery__Filter"
          onChange={HandlejiraTypeChange}
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
          className="DelaysInDelivery__Filter"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />

        <input
          className="DelaysInDelivery__Filter"
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