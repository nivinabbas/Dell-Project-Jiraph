import React, { useState } from 'react';
import "./ChangesByParentId.css";
import Select from 'react-select'
import { useEffect } from 'react';
import PieChartAnalysis from "../charts/PicChartAnalysis"

//Server Filters to receive Data
let serverFilters = { fixVersion: [], startDate: "", endDate: "" };

function ChangesByParentId() {
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
      fixVersion: [],
      startDate: startDate,
      endDate: endDate
    };
    //fetch to receive Available Filters options from server
    fetch('/api/analytics/changesByParentIdFilters', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.length > 0) {
          setfixVersionOptions(data[0].fixVersions)
        }
        else {
          alert("No Available Filters From The Server Check The connection")
        }

      })
  }, [])

  const [UiObjs,setUiObjs]=useState([]);
  const [fixVersionOptions,setfixVersionOptions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  //fetch to receive Data (UiObj) from server after every filter Change
  const render = (serverFilters) => {
    fetch('/api/analytics/ChangesByParentIdFilters', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUiObjs(data)
      })
  }

  //Filters Changes Handlers
  // for each Filter we have a handler
  // to update serverFilters that we send to server to receive data according to our picks

  //fixVersion
  const HandlefixVersionChange = (change => {
    serverFilters.fixVersion = [change.label];
    render(serverFilters);
  })
  
  //Start Date
  const HandleStartDateChange = (change => {
    serverFilters.startDate = change.target.value;
    render(serverFilters);
  })

  //End Date
  const HandleEndDateChange = (change => {
    let endDate =new Date(change.target.value)
    const timeZone = (endDate.getTimezoneOffset() / 60);
    endDate.setHours((0 - timeZone)+(23), 59, 59, 59);
    serverFilters.endDate = endDate;
    render(serverFilters);
  })

  return (

    <div className='ChangesByParentIdWrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="ChangesByParentId__Title">Changes By Parent Id</div>
      <div className="ChangesByParentId__Chart" >
        {UiObjs.length > 0 && <PieChartAnalysis UiObjs={UiObjs} title="Changes By Parent ID (All)" />}
      </div>
      {/* Select Filters */}
      
      <div className="ChangesByParentId__Filters__wrapper"> 
      <form className="ChangesByParentId__Filters__fields">
      <div className="Date_header">
         <p>Fix Version</p> 
        <Select
          name="fixVersion"
          options={fixVersionOptions}
          placeholder="fix Version "
          className="ChangesByParentId__Filter"
          onChange={HandlefixVersionChange}
        />
      </div>
        <div className="Date_header">
         <p>Start Date</p> 
        <input
          className="ChangesByParentId__DateFilter"
          type="date"
          name="startDate"
          value={startDate}
          onChange={HandleStartDateChange}
        />
        </div>
        
        <div className="Date_header">
         <p>End Date</p> 
        <input
          className="ChangesByParentId__DateFilter"
          type="date"
          name="endDate"
          value={endDate}
          onChange={HandleEndDateChange}
        />
        </div>
      </form>
      </div>
      </div>
  )

}


export default ChangesByParentId;