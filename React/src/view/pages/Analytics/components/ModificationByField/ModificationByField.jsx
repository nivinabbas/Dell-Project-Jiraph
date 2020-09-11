import React, { useEffect } from 'react';
import "./ModificationByField.css";
import { useState, useRef } from 'react';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from "react-select"
import Chart from "../charts/Chart"



let serverFilters = { fieldName: [], values: [], qaRepresentative: [], startDate: "", endDate: "", label: [] };




function ModificationByField(props) {

  let startDate = new Date()

  let endDate = new Date()
  startDate.setMonth(endDate.getMonth() - 1)
  const timeZone = startDate.getTimezoneOffset()/60
  startDate.setHours(0-timeZone, 0, 0, 0)
  endDate.setHours(0-timeZone, 0, 0, 0)
  var today = new Date();
  today.setHours(0, 0, 0, 0)
  var str = today.toGMTString();  // deprecated! use toUTCString()
  
  console.log(timeZone);

  

  useEffect(() => {
    serverFilters = { fieldName: [], values: [], qaRepresentative: [], startDate: (startDate), endDate: (endDate), label: ["daily"] };

    fetch('/api/analytics/modificationByFieldFilters', {
      method: 'POST',
      body: JSON.stringify({ fieldName: serverFilters.fieldName, startDate: serverFilters.startDate, endDate: serverFilters.endDate }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.length > 0) {
          setFieldNameOptions(data[0].labels)
          setQaRepresentativeOptions(data[0].QA);
        }
        else {
          alert("Check the connection with the server...")
        }
      })

    fetch('/api/analytics/modificationByField', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
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
    fetch('/api/analytics/modificationByField', {
      method: 'POST',
      body: JSON.stringify({ serverFilters }),
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
            setValueOptions(data);

          }
        }

      })
  }


  const [UiObjs, setUiObjs] = useState([]);
  const [fieldNameOptions, setFieldNameOptions] = useState([]);
  const [valueOptions, setValueOptions] = useState([]);
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([]);
  const labelOptions = [
    { label: "daily" },
    { label: "weekly" },
    { label: "monthly" },
    { label: "yearly" }
  ];


  const handleChangeLabel = (change => {

    serverFilters.label = [change.label];
    render(serverFilters);
  })

  const handleChangeFieldName = (change => {
    serverFilters.values = []
    serverFilters.qaRepresentative = []
    if (change != null) {
      serverFilters.fieldName = [change.value];
    }
    else {
      serverFilters.fieldName = [];
    }
    render(serverFilters)
    renderFilters(serverFilters);
  })

  const handleChangeValues = (change => {
    serverFilters.values = []
    if (change != null) {
      change.map((item) => {
        return (
          serverFilters.values.push(item.value)
        )
      })
    }
    else {
      serverFilters.values = [];
    }
    render(serverFilters);
  })

  const handleChangeQaRepresentative = (change => {

    serverFilters.qaRepresentative = [change.value];
    render(serverFilters);
  })

  const handleChangeStartDate = (change => {
    console.log(change.target.value)
    serverFilters.startDate = new Date(change.target.value);
    render(serverFilters);
  })

  const handleChangeEndDate = (change => {
    serverFilters.endDate = new Date(change.target.value);
    render(serverFilters);
  })

  const valueInput = useRef("")
  const qaInput = useRef("")

  return (
    <div className='ModificationByField__Wrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="ModificationByField__Chart"> {UiObjs && <Chart UiObjs={UiObjs} />}</div>
      <div className="ModificationByField__MainTitle">Modification By Field</div>

      <div className="ModificationByField__Filters">


        <Select
          name="fieldName"
          onInputChange={() => { valueInput.current.state.value = ""; qaInput.current.state.value = "" }}
          onChange={handleChangeFieldName}
          placeholder="fieldName"
          className="ModificationByField__Filter"
          options={fieldNameOptions}
          isClearable={true} />

        <Select
          name="value"
          onChange={handleChangeValues}
          ref={valueInput}
          isMulti
          placeholder="Value"
          className="ModificationByField__Filter"
          options={valueOptions} />

        <Select
          name="qaRepresentative"
          ref={qaInput}
          onChange={handleChangeQaRepresentative}
          placeholder="Qa Rep"
          className="ModificationByField__Filter"
          options={qaRepresentativeOptions} />

        <input
          className="ModificationByField__Filter__date"
          type="date"
          name="startDate"
          onChange={handleChangeStartDate}
        />


        <input
          className="ModificationByField__Filter__date"
          type="date"
          name="endDate"
          onChange={handleChangeEndDate}
        />


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



