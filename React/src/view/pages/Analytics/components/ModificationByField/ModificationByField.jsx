import React, { useEffect } from 'react';
import "./ModificationByField.css";
import { useState } from 'react';

import Select from "react-select"
import Chart from "../charts/Chart"
// import ApexChart from "../ApexChart/ApexChart"




function ModificationByField(props) {
  const serverFilters = { fieldName: [], values: [], qaRepresentative: [], startDate: [], endDate: [], label: ["weekly"] };


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
        setFieldNameOptions(data)
        console.log(data);
      })
  },[])

  const render = (serverFilters) => {
    fetch('/api/analytics/modificationByField', {
      method: 'POST',
      body: JSON.stringify(serverFilters),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => { setUiObjs(data) })
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
        if (data.length > 0) {
          console.log(data)
          setQaRepresentativeOptions(data[0].QA);
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
    serverFilters.label = [change.value]
    render(serverFilters);
  })

  const handleChangeFieldName = (change => {
    serverFilters.fieldName = [change.label];
    renderFilters(serverFilters);
  })

  const handleChangeValues = (change => {
    console.log(change)
    if (change!=null)
    serverFilters.values = [change.label];
    else 
    serverFilters.values = [];
    render(serverFilters);
  })

  const handleChangeQaRepresentative = (change => {
    serverFilters.qaRepresentative = [change.label];
    render(serverFilters);
  })
  const handleChangeStartDate = (change => {
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


        <Select
          name="fieldName"
          onChange={handleChangeFieldName}
          placeholder="fieldName"
          className="ModificationByField__Filter"
          options={fieldNameOptions} />

        <Select
          name="value"
          onChange={handleChangeValues}
          isMulti
          placeholder="Value"
          className="ModificationByField__Filter"
          options={valueOptions} />

        <Select
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



