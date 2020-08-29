import React from 'react';
import "./DelaysInDelivery.css";

import Select from 'react-select'

import { useState , useEffect } from 'react';


function DelaysInDelivery() {

  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);

  // Options To Send == > Server 
  const [ fixVersion , setfixVersion ]=useState([])
  const [ jiraType , setJiraType ]=useState([])
  const [ label  , setLabel ]=useState([])
  const [ qaRepresentative  , setQaRepresentative]=useState([])
  const [ startDate,setStartDate ]=useState([])
  const [ endDate,setEndDate ]=useState([] )

  

   // Options To get From Server 
   const [fixVersionOptions,setfixVersionOptions]=useState([])
   const [jiraTypeOptions,setJiraTypeOptions]=useState([])
   const [qaRepresentativeOptions,setQaRepresentativeOptions]=useState([])




   const [labelOptions, setLabelOptions] = useState([
   {name:"label" , value: "Daily"  ,   label: "Daily" },
   {name:"label" , value: "Weekly" ,   label: "Weekly" },
   {name:"label" , value: "Monthly",   label: "Monthly" },
   {name:"label" , value: "Yearly" ,   label: "Yearly" } 
  ])
  
 
  // Functions ==> Fetch : 
  const render = ()=> {
    fetch('/api/analytics/DelaysInDelivery/---', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => { setUiObjs(data) })
  
      }

  useEffect(() => {
   
    fetch('/api/analytics/---')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        
        //set state (fix Versions => get all the options )
        setfixVersionOptions(data);
      })
 

}, [])

  const HandlefixVersionChange=(version=>{
    console.log(version.value)
    setfixVersion(version.value)
    

    fetch('/api/analytics/ChangesInJiraTickets/---', {
      method: 'POST',
      body: JSON.stringify({ fixVersion }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => { 
          data.map(array =>{
              if(array.name=="jiraType"){
                  setJiraTypeOptions(array)
              }
              if(array.name=="qaRepresentative"){
                  setQaRepresentativeOptions(array)
              }
          })
          
            })

    })
  
  
  const HandlejiraTypeChange=(type=>{
      
           setJiraType(type.value)


      render ();
    })

  const HandleqaRepresentativeChange=(Qa=>{
        setQaRepresentative([Qa.value])
  

   render ();
  })

  const HandleStartDateChange=(date=>{
    console.log(date.target.value)

    /*setStartDate(new Date(date.value))*/
    render ();
  })

  const HandleEndDateChange=(date=>{
    console.log(date.value)
    setEndDate(date.target.value)
 

    render ();
  })

  const HandleLabelChange=(label=>{
      console.log(label.value)
      setLabel([label.value])


      render ();
    })
  
  return (

    <div className='DelaysInDeliveryWrapper'>
      <div className="DelaysInDelivery__Title">Delays in Delivery</div>
     
      {/* Select Filters */}

      <form className="DelaysInDelivery__Filters">

        <Select 
        name="fixVersion"
        options={fixVersionOptions} 
        placeholder="fix Version " 
        className="DelaysInDelivery__Filter" 
        onChange={HandlefixVersionChange}
        
        />
        
        <Select 
        name="jiraType"
        isMulti
        options={jiraTypeOptions} 
        placeholder="jira Type  " 
        className="DelaysInDelivery__Filter"
        onChange={HandlejiraTypeChange}
        />

        <Select 
        name="qaRepresentative"
        isMulti
        options={qaRepresentativeOptions} 
        placeholder="Qa Representative " 
        className="DelaysInDelivery__Filter"
        onChange={HandleqaRepresentativeChange}
        />

        <input 
        className="DelaysInDelivery__Filter" 
        type="date" 
        name="startDate" 
        onChange={HandleStartDateChange} 
        />

        <input 
        className="DelaysInDelivery__Filter" 
        type="date" 
        name="endDate" 
        onChange={HandleEndDateChange} 
        />

        <Select 
        name="labels"
        options={labelOptions} 
        placeholder="Label" 
        className="DelaysInDelivery__Filter" 
        onChange={HandleLabelChange} 
        />
    
      </form>
    </div>
  )

}


export default DelaysInDelivery;