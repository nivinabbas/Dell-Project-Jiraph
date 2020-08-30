import React, { useEffect } from 'react';
import "./ModificationByField.css";
import { useState } from 'react';
import MainTable from "../MainTable/MainTable"
import Select from "react-select"
import Chart from "../charts/Chart"
// import ApexChart from "../ApexChart/ApexChart"




function ModificationByField(props) {
  const serverFilters={fieldName:[],values:[],qaRepresentative:[],startDate:[],endDate:[],label:["weekly"]};
  
  
  useEffect(() => {
   
    fetch('/api/analytics/modificationByFieldFilters', {
      method: 'POST',
      body: JSON.stringify({fieldName:serverFilters.fieldName}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        
       setFieldNameOptions(data[0].labels)
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
      body: JSON.stringify({ fieldName:serverFilters.fieldName }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => { 
        if(data.length>0){
          console.log(data)
                setQaRepresentativeOptions(data[0].QA);
                setValueOptions(data[0].Values);
        }
                 
      })
  }


  const date = new Date()
  const date1MonthAgo = new Date(new Date().setMonth(date.getMonth() - 1));


 

  // const [fieldName, setFieldName] = useState([]);
  // const [values, setValues] = useState([]);
  // const [qaRepresentative, setQaRepresentative] = useState([]);
  // const [label, setLabel] = useState([]);
  // const [startDate, setStartDate] = useState(date1MonthAgo);
  // const [endDate, setEndDate] = useState(date);


  const [UiObjs, setUiObjs] = useState([]);
  const [fieldNameOptions, setFieldNameOptions] = useState([]);
  const [valueOptions, setValueOptions] = useState([]);
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([]);
  const [labelOptions, setLabelOptions] = useState([
    { label: "Daily"  , value: "daily" }, 
    { label: "Weekly" , value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly" , value: "yearly" }
  ]);


  const handleChangeLabel = (change => {
    serverFilters.label=[change.value]

    render(serverFilters);
  })

  const  handleChangeFieldName=(change=> {
    serverFilters.fieldName=[change.label];
    renderFilters(serverFilters);
  })

  const handleChangeValues = (change => {
    serverFilters.values=[change.label];
    
    render(serverFilters);

  })
  const handleChangeQaRepresentative = (change => {
    serverFilters.qaRepresentative=[change.label];
    render(serverFilters);
  })
  const handleChangeStartDate = (change => {
    serverFilters.startDate=[change.target.value];
   
    render(serverFilters);
  })
  const handleChangeEndDate = (change => {
    serverFilters.endDate=[change.target.value];
    render(serverFilters);
    })






  return (



    <div className='ModificationByField__Wrapper'>
     
      <div className="charti"> {UiObjs.length>0 && <Chart UiObjs={UiObjs}/>}</div>
      
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



