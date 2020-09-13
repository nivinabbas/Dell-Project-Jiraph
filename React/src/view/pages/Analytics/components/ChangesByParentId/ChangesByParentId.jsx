import React from 'react';
import "./ChangesByParentId.css";
import Select from 'react-select'
import { useState, useEffect } from 'react';
import Chart from "../charts/Chart"
const serverFilters = { fixVersion: [], startDate: (new Date("2020-08-1")), endDate: new Date("2020-09-1")};


function ChangesByParentId() {

  const [UiObjs, setUiObjs] = useState([]);

  // Options To get From Server 
  const [fixVersionOptions, setfixVersionOptions] = useState([])

  

  useEffect(() => {
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
        setfixVersionOptions(data[0].fixVersions)
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
      <div className="ChangesByParentId__Chart"> {UiObjs.length > 0 && <Chart UiObjs={UiObjs} />}</div>
      {/* Select Filters */}
      
      <div className="ChangesByParentId__Filters__wrapper">
        <div className="ChangesByParentId__Filters__headers">
          <p className="filter__header__item">Old/New</p>
          <p className="filter__header__item">Start date</p>
          <p className="filter__header__item">End date</p>
        </div>
      <form className="ChangesByParentId__Filters__fields">

        <Select
          name="fixVersion"
          options={fixVersionOptions}
          placeholder="fix Version "
          className="ChangesByParentId__Filter"
          onChange={HandlefixVersionChange}
        />


        <input
          className="ChangesByParentId__Filter__i"
          type="date"
          name="startDate"
          onChange={HandleStartDateChange}
        />

        <input
          className="ChangesByParentId__Filter__i"
          type="date"
          name="endDate"
          onChange={HandleEndDateChange}
        />

      </form>
      </div>
      <div className="ChangesByParentId__Chart">

      </div>
    </div>
  )

}


export default ChangesByParentId;