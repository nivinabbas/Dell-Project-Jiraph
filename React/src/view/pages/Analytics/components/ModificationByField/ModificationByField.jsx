import React, { useEffect } from 'react';
import "./ModificationByField.css";
import { useState } from 'react';
import MainTable from "../MainTable/MainTable"
import Select from "react-select"
// import ApexChart from "../ApexChart/ApexChart"




function ModificationByField(props) {
  
  const renderFieldName =() => {

    fetch('/api/analytics/modificationByFieldFilters', {
      method: 'POST',
      body: JSON.stringify({fieldName}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        //set state (news)
       console.log(data);
      })
  }
  

  const date = new Date()
  const date1MonthAgo = new Date(new Date().setMonth(date.getMonth() - 1));

  const render = () => {
    fetch('/api/analytics/modificationByField', {
      method: 'POST',
      body: JSON.stringify({ fieldName, values, label, qaRepresentative }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => { console.log(data) })
  }


  const [fieldName, setFieldName] = useState([]);
  const [values, setValues] = useState([]);
  const [qaRepresentative, setQaRepresentative] = useState([]);
  const [label, setLabel] = useState([]);
  const [startDate, setStartDate] = useState(date1MonthAgo);
  const [endDate, setEndDate] = useState(date);


  const [UiObjs, setUiObjs] = useState([]);
  const [fieldNameOptions, setFieldNameOptions] = useState([]);
  const [valueOptions, setValueOptions] = useState([]);
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([]);
  const [labelOptions, setLabelOptions] = useState([{ label: "Daily", value: "daily" }, { label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }, { label: "Yearly", value: "yearly" }]);

  renderFieldName();

  const handleChangeLabel = (change => {
    setLabel([change.value])

    render();
  })
  const handleChangeFieldName = (change => {
    setFieldName([change.value])
    renderFieldName();
  })
  const handleChangeValues = (change => {
    setLabel([change.value])
    render();

  })
  const handleChangeQaRepresentative = (change => {
    setQaRepresentative([change.value])
    render();
  })
  const handleChangeStartDate = (change => {
    setStartDate(change.target.value)
    console.log(startDate)
    render();
  })
  const handleChangeEndDate = (change => {
    setEndDate(change.target.value)
    console.log(endDate)
    // render();
  })






  return (



    <div className='ModificationByField__Wrapper'>
      <div className="ModificationByField__Table" >
      <MainTable changes={true}  />
      <MainTable  />
      </div>
      
      <div className="ModificationByField__MainTitle">Modification By Field</div>
      <div className="ModificationByField__Chart">
      </div>
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



