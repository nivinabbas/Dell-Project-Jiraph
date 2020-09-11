import React, { useEffect } from 'react';
import "./ModificationByField.css";
import { useState, useRef } from 'react';
import Select from "react-select"
import Chart from "../charts/Chart"

//Server Filters to receive Data
let serverFilters = { fieldName: [], values: [], qaRepresentative: [], startDate: "", endDate: "", label: [] };

function ModificationByField(props) {
  //On Page Opening
  useEffect(() => {
    //Building Start and End date for last month (Default)
    let startDate = new Date();
    let endDate = new Date();
    startDate.setMonth(endDate.getMonth() - 1);
    const timeZone = (startDate.getTimezoneOffset() / 60);
    startDate.setHours(0 - timeZone, 0, 0, 0);
    endDate.setHours(0 - timeZone, 0, 0, 0);

    //Default Server Filters to receive Data
    serverFilters = {
      fieldName: [],
      values: [],
      qaRepresentative: [],
      startDate: (startDate),
      endDate: (endDate),
      label: ["daily"]
    };

    //fetch to receive Available Filters options from server by date
    fetch('/api/analytics/modificationByFieldFilters', {
      method: 'POST',
      body: JSON.stringify({
        fieldName: serverFilters.fieldName,
        startDate: serverFilters.startDate,
        endDate: serverFilters.endDate
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setFieldNameOptions(data[0].labels);
          setQaRepresentativeOptions(data[0].QA);
        }
        else {
          alert("No Available Filters From The Server Check The connection / Change date")
        }
      })

    //fetch to receive Data (UiObj) from the server
    fetch('/api/analytics/modificationByField', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data != null) { setUiObjs(data); }
        else { setUiObjs([]); }
      })
  }, [])

  //fetch to receive Data (UiObj) from server after every filter Change
  const render = (serverFilters) => {
    fetch('/api/analytics/modificationByField', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          setUiObjs(data);
        }
        else {
          setUiObjs([]);
        }
      })
  }

  //fetch to get values after picking certain fieldName 
  const renderFilters = (serverFilters) => {
    fetch('/api/analytics/modificationByFieldFilters', {
      method: 'POST',
      body: JSON.stringify({ fieldName: serverFilters.fieldName }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          if (data.length > 0)
            setValueOptions(data[0].Values);
          else {
            alert("No Available FieldName Values received From The Server (Check Coonection /Pick another fieldName)")
            setValueOptions([]);
          }
        }
      })
  }

  //Modification By Field Variables
  const [UiObjs, setUiObjs] = useState([]); //UiObject from the server
  const [fieldNameOptions, setFieldNameOptions] = useState([]); //FieldName options for filtering
  const [valueOptions, setValueOptions] = useState([]);//Values of certain FieldName options for filtering
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([]);//Qa Representative options for filtering
  const labelOptions = [ //Labels for Displaying the Chart 
    { label: "daily" },
    { label: "weekly" },
    { label: "monthly" },
    { label: "yearly" }];


  //Filters Changes Handlers
  // for each Filter we have a handler
  // to update serverFilters that we send to server to receive data according to our picks

  //Label
  const handleChangeLabel = (change => {
    serverFilters.label = [change.label];
    render(serverFilters);
  })

  //Field Name
  const handleChangeFieldName = (change => {
    serverFilters.values = [];
    serverFilters.qaRepresentative = [];
    if (change != null) { serverFilters.fieldName = [change.value]; }
    else { serverFilters.fieldName = []; }
    render(serverFilters);
    renderFilters(serverFilters);
  })

  //Values
  const handleChangeValues = (change => {
    serverFilters.values = [];
    if (change != null) {
      change.map((item) => { return (serverFilters.values.push(item.value)) })
    }
    else { serverFilters.values = []; }
    render(serverFilters);
  })

  //Qa Representative
  const handleChangeQaRepresentative = (change => {
    serverFilters.qaRepresentative = [change.value];
    render(serverFilters);
  })

  //Start Date
  const handleChangeStartDate = (change => {
    serverFilters.startDate = new Date(change.target.value);
    render(serverFilters);
  })
  //End Date
  const handleChangeEndDate = (change => {
    serverFilters.endDate = new Date(change.target.value);
    render(serverFilters);
  })

  //We Use UseRef to clear other filters when we pick Main Filter
  const valueInput = useRef("")
  const qaInput = useRef("")


  return (
    <div className='ModificationByField__Wrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="ModificationByField__Chart">
        {UiObjs && <Chart UiObjs={UiObjs} />}
      </div>
      <div className="ModificationByField__MainTitle">Modification By Field</div>
      <div className="ModificationByField__Filters">

        /*ALL THE FILTERS */

        /*FIELD NAME*/
        <Select
          name="fieldName"
          onInputChange={() => { valueInput.current.state.value = ""; qaInput.current.state.value = "" }}
          onChange={handleChangeFieldName}
          placeholder="fieldName"
          className="ModificationByField__Filter"
          options={fieldNameOptions}
          isClearable={true} />

        /*VALUE*/
        <Select
          name="value"
          onChange={handleChangeValues}
          ref={valueInput}
          isMulti
          placeholder="Value"
          className="ModificationByField__Filter"
          options={valueOptions} />

        /*Qa Representative*/
        <Select
          name="qaRepresentative"
          ref={qaInput}
          onChange={handleChangeQaRepresentative}
          placeholder="Qa Rep"
          className="ModificationByField__Filter"
          options={qaRepresentativeOptions} />

        /*START DATE*/
        <input
          className="ModificationByField__Filter__date"
          type="date"
          name="startDate"
          onChange={handleChangeStartDate}
        />

        /*END DATE*/
        <input
          className="ModificationByField__Filter__date"
          type="date"
          name="endDate"
          onChange={handleChangeEndDate}
        />

        /*LABEL */
        <Select
          name="label"
          onChange={handleChangeLabel}
          placeholder="Label"
          className="ModificationByField__Filter"
          options={labelOptions} />
      </div>
    </div>
  )

}


export default ModificationByField;



