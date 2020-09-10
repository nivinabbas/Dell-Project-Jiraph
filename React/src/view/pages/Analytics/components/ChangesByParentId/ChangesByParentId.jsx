import React from 'react';
import "./ChangesByParentId.css";
import Select from 'react-select'
import { useState, useEffect } from 'react';
import Chart from "../charts/Chart"
import PieChartAnalysis from "../charts/PicChartAnalysis"
let serverFilters = { fixVersion: [], startDate: (new Date("2020-08-1")), endDate: new Date("2020-09-1")};

function ChangesByParentId() {


  const [UiObjs, setUiObjs] = useState([]);

  // Options To get From Server 
  const [fixVersionOptions, setfixVersionOptions] = useState([])

  

  useEffect(() => {
    serverFilters = { fixVersion: [], startDate: ("2020-08-1"), endDate: ("2020-09-30")};
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
        if(data.length>0){
        setfixVersionOptions(data[0].fixVersions)}
        else {
          alert("Check the connection with server ... ")
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
    render (serverFilters);
  })

  const HandleStartDateChange = (change => {
    serverFilters.startDate = change.target.value;
    render (serverFilters);
  })

  const HandleEndDateChange = (change => {
    serverFilters.endDate = change.target.value;
    render (serverFilters);
  })

  return (

    <div className='ChangesByParentIdWrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="ChangesByParentId__Title">Changes By Parent Id</div>
      <div className="ChangesByParentId__Chart" >
      {UiObjs.length>0 && <PieChartAnalysis UiObjs={UiObjs} />}
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