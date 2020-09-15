import React, { useEffect } from 'react';
import "./ModificationByField.css";
import { useState, useRef } from 'react';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from "react-select"
import Chart from "../charts/Chart"



const serverFilters = { fieldName: [], values: [], qaRepresentative: [], startDate: (new Date("2020-08-1")), endDate: new Date("2020-09-1"), label: ["weekly"] };


//const savedFilters = { pageName: 'ModificationByField', filter1: { values: [] }, filter2: { values: [] }, filter3: { values: [] }, filter4: [] };
const savedFilters = { pageName: 'ModificationByField', filters: [{ filter: 'fieldName', values: [] }, { filter: 'value', values: [] }, { filter: 'qaRepresentative', values: [] }, { filter: 'label', values: [] }], filterName: '' };
let filterName ='';


function ModificationByField(props) {


  useEffect(() => {

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
      body: JSON.stringify({ serverFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
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
        if (data != null) {
          if (data.length > 0)
            setValueOptions(data[0].Values);

          else {
            setValueOptions(data);

          }
        }

      })
  }

  const renderSavedFilters = (savedFilters) => {
    console.log(savedFilters.pageName);
    fetch('/api/analytics/modificationByFieldSelectTwo', {
      method: 'POST',
      body: JSON.stringify({savedFilters}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.array[0].filters[1].values)
        console.log(data.array[data.array.length-1].filterNames);
        console.log(data.array[data.array.length-1].filterNames[0].value);
      //  console.log(data.array[0].filters[1].values[0])
        const myArray=[];
        // array=data;
       
        if (data.array != null) {
          if (data.array.length > 0){
           
            //  for(let i=0;i<data.array.length;i++){
            
              setSelectFiltersOptions(data.array[data.array.length-1].filterNames);
            // } 


          }
          
          // setQaRepresentativeOptions(data[0].Values);

        }

      })
  }


  const [UiObjs, setUiObjs] = useState([]);
  const [fieldNameOptions, setFieldNameOptions] = useState([]);
  const [valueOptions, setValueOptions] = useState([]);
  const [qaRepresentativeOptions, setQaRepresentativeOptions] = useState([]);

  const [selectFiltersOptions, setSelectFiltersOptions] = useState([]);

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
    serverFilters.fieldName = [change.value];
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


  //handleFilterName
  const handleFilterName = (e=>{
    filterName  = e.target.value;
 
  })

  const handleSelectFilter=(change=>{
    renderSavedFilters(savedFilters);
  })

  // handleSaveFilter
  const handleSaveFilter = (e => {
  
    savedFilters.filters[0].values.push(serverFilters.fieldName);
    savedFilters.filters[1].values.push(serverFilters.values);
    savedFilters.filters[2].values.push(serverFilters.qaRepresentative);
    savedFilters.filters[3].values.push(serverFilters.label[0]);
    savedFilters.filterName=filterName;

    fetch('/api/analytics/modificationByFieldSavedFilters', {
      method: 'POST',
      body: JSON.stringify({ savedFilters }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if(data.success==true)
          renderSavedFilters(savedFilters);
      })
  })


  const valueInput = useRef("")
  const qaInput = useRef("")
  // const selectinput = useRef("")


  return (
    <div className='ModificationByField__Wrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="ModificationByField__Chart"> {UiObjs.length > 0 && <Chart UiObjs={UiObjs} />}</div>
      <div className="ModificationByField__MainTitle">Modification By Field</div>

      <div className="ModificationByField__Filters">


        <Select
          name="fieldName"
          id="fieldName"
          onInputChange={() => { valueInput.current.state.value = ""; qaInput.current.state.value = "" }}
          onChange={handleChangeFieldName}
          placeholder="fieldName"
          className="ModificationByField__Filter"
          options={fieldNameOptions} />

        <Select
          name="value"
          id="value"
          onChange={handleChangeValues}
          ref={valueInput}
          isMulti
          placeholder="Value"
          className="ModificationByField__Filter"
          options={valueOptions} />

        <Select
          name="qaRepresentative"
          id="qaRepresentative"
          ref={qaInput}
          onChange={handleChangeQaRepresentative}
          placeholder="Qa Rep"
          className="ModificationByField__Filter"
          options={qaRepresentativeOptions} />

        <input
          className="ModificationByField_Filter_date"
          type="date"
          name="startDate"
          onChange={handleChangeStartDate}
        />


        <input
          className="ModificationByField_Filter_date"
          type="date"
          name="endDate"
          onChange={handleChangeEndDate}
        />


        <Select
          name="label"
          id="label"
          onChange={handleChangeLabel}
          placeholder="Label"
          className="ModificationByField__Filter"
          options={labelOptions} />

        {/* <input className="ModificationByField__Filter"
          type="text"
          name="filterName"
          id="filterName"
          placeholder="filterName" onKeyUp={handleSaveFilter}></input> */}
        <form >
        <input className="ModificationByField__Filter"
          type="text"
          name="filterName"
          id="filterName"
          placeholder="filterName" onKeyUp={handleFilterName}></input>
          <button
            id="saveFilterBTN"
            type="button"
            onClick={handleSaveFilter}
            className="ModificationByField__Filter"
            name="saveFilterBTN">Save Filter
          </button>
        </form>

        <Select
          name="selectFilter"
          id="selectFilter"
          onClick={handleSelectFilter}
          placeholder="selectFilter"
          // ref={selectinput}
          className="ModificationByField__Filter"
          options={selectFiltersOptions} />



      </div>



    </div>
  )

}


export default ModificationByField;