import React, { useEffect } from 'react';
import "./ModificationByField.css";
import { useState } from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from "react-select"
import Chart from "../charts/Chart"
// import ApexChart from "../ApexChart/ApexChart"



const serverFilters = { fieldName: [], values: [], qaRepresentative: [], startDate: [], endDate: [], label: ["weekly"] };

function ModificationByField(props) {


  useEffect(() => {

    fetch('/api/analytics/modificationByFieldFilters', {
      method: 'POST',
      body: JSON.stringify({ fieldName: serverFilters.fieldName }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setFieldNameOptions(data[0].labels)
        setQaRepresentativeOptions(data[0].QA);
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
      body: JSON.stringify({serverFilters}),
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
        console.log(data)
        if (data.length > 0) {
          
          setValueOptions(data[0].Values);
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
    serverFilters.label = []
    change.map((item,index)=>{
      serverFilters.label.push(item.value)
    })
    render(serverFilters);
  })

  const handleChangeFieldName = (change => {
    serverFilters.fieldName = []
    change.map((item,index)=>{
      serverFilters.fieldName.push(item.value)
    })
    render(serverFilters)
    renderFilters(serverFilters);
  })

  const handleChangeValues = (change => {
    serverFilters.values = []
    if (change != null) {
      change.map((item,index)=>{
        serverFilters.values.push(item.value)
      })
    }
    else {
      serverFilters.values = [];
    }
    render(serverFilters);
  })

  const handleChangeQaRepresentative = (change => {

     serverFilters.qaRepresentative = []
    if (change != null) {
      change.map((item,index)=>{
        serverFilters.qaRepresentative.push(item.value)
      })
    }
    else {
      serverFilters.qaRepresentative = [];
    }
    render(serverFilters);
  })

  const handleChangeStartDate = (change => {
    console.log(new Date(change.target.value))
    serverFilters.startDate = [change.target.value];
    render(serverFilters);
  })

  const handleChangeEndDate = (change => {
    serverFilters.endDate = [change.target.value];
    render(serverFilters);
  })

  return (
    <div className='ModificationByField__Wrapper'>
      <div className="ModificationByField__Chart"> {UiObjs.length > 0 && <Chart UiObjs={UiObjs} />}</div>
      <div className="ModificationByField__MainTitle">Modification By Field</div>

      <div className="ModificationByField__Filters">


        <ReactMultiSelectCheckboxes
          name="fieldName"
          onChange={handleChangeFieldName}
          placeholder="fieldName"
          className="ModificationByField__Filter"
          options={fieldNameOptions} />

        <ReactMultiSelectCheckboxes
          name="value"
          onChange={handleChangeValues}
          isMulti
          placeholder="Value"
          className="ModificationByField__Filter"
          options={valueOptions} />

        <ReactMultiSelectCheckboxes
          name="qaRepresentative"
          onChange={handleChangeQaRepresentative}
          placeholder="Qa Rep"
          className="ModificationByField__Filter"
          options={qaRepresentativeOptions} />

        <input
          className="ModificationByField__Filter"
          type="date"
          name="startDate"
          onChange={handleChangeStartDate}
        />


        <input
          className="ModificationByField__Filter"
          type="date"
          name="endDate"
          onChange={handleChangeEndDate}
        />


        <ReactMultiSelectCheckboxes
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



