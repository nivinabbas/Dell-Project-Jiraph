import React from 'react';
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
    const timeZone = startDate.getTimezoneOffset() / 60
    startDate.setHours(0 - timeZone, 0, 0, 0)
    endDate.setHours(0 - timeZone, 0, 0, 0)

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


  const HandlefixVersionChange = (change => {
    serverFilters.fixVersion = [change.label];
    render(serverFilters);
  })

  const HandleStartDateChange = (change => {
    serverFilters.startDate = change.target.value;
    render(serverFilters);
  })

  const HandleEndDateChange = (change => {
    serverFilters.endDate = change.target.value;
    render(serverFilters);
  })

  return (

    <div className='ChangesByParentIdWrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="ChangesByParentId__Title">Changes By Parent Id</div>
      <div className="ChangesByParentId__Chart" >
        {UiObjs.length > 0 && <PieChartAnalysis UiObjs={UiObjs} />}
      </div>
      {/* Select Filters */}

      <form className="ChangesByParentId__Filters">

        <Select
          name="fixVersion"
          options={fixVersionOptions}
          placeholder="fix Version "
          className="ChangesByParentId__Filter"
          onChange={HandlefixVersionChange}
        />


        <input
          className="ChangesByParentId__Filter"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />

        <input
          className="ChangesByParentId__Filter"
          type="date"
          name="endDate"
          onChange={HandleEndDateChange}
        />

      </form>

    </div>
  )

}


export default ChangesByParentId;