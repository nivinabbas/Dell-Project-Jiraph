import React from 'react';
import "./ChangesInJiraTickets.css";
import Chart from "../charts/Chart";
import Select from 'react-select'
import ApexChart from '../ApexChart/ApexChart'
import { useState , useEffect } from 'react';


function ChangesInJiraTickets() {
  const date = new Date()
  const date1MonthAgo = new Date(new Date().setMonth(date.getMonth() - 1));

  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);

  // Options To Send == > Server 
  const [ values , setValue ]=useState([])
  const [ status , setStatus ]=useState([])
  const [ label  , setLabel ]=useState([])
  const [ qaRepresentative  , setQaRepresentative]=useState([])
  const [ startDate,setStartDate ]=useState([])
  const [ endDate,setEndDate ]=useState([] )

  

   // Options To get From Server 
   const [valueOptions,setValueOptions]=useState([])
   const [statusOptions,setStatusOptions]=useState([
   { name:"status" , value: "Done"  ,   label: "Done"} ,
   { name:"status" , value: "Backlog"  ,   label: "Backlog"} ,
  ])
  const [qaRepresentativeOptions,setQaRepresentativeOptions]=useState([])




   const [labelOptions, setLabelOptions] = useState([
   {name:"label" , value: "Daily"  ,   label: "Daily" },
   {name:"label" , value: "Weekly" ,   label: "Weekly" },
   {name:"label" , value: "Monthly",   label: "Monthly" },
   {name:"label" , value: "Yearly" ,   label: "Yearly" } 
  ])
  
 
  // Functions ==> Fetch : 
  const render = ()=> {
    fetch('/api/analytics/ChangesInJiraTickets/---', {
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
   
    fetch('/api/analytics/----')
      .then(res => res.json())
      .then(data => {
        
        //set state (UiObj)
        setUiObjs(data);
      })
}, [])


  
  const HandleValuesChange=(val=>{
    console.log(val.value)
    setValue([val.value])
    

    render();
  })
  
  
  const HandleStatusChange=(status=>{
      
     setStatus([status.value])

      render();
    })

  const HandleqaRepresentativeChange=(Qa=>{
      setQaRepresentative([Qa.value])
 
 render();
})

  const HandleStartDateChange=(date=>{
    console.log(date)

    setStartDate(date.target.value)
    render();
  })

  const HandleEndDateChange=(date=>{
    console.log(date.value)
    setEndDate(date.target.value)
 

    render();
  })
  
  const HandleLabelChange=(label=>{
      console.log(label.value)
      setLabel([label.value])


      render();
    })
  
  return (

    <div className='ChangeOfJiraTicketWrapper'>
      <div className="ChangeOfJiraTicket__Title">Changes Of Jira Tickets</div>
     
      {/* Select Filters */}

      <form className="ChangeOfJiraTicket__Filters">

        <Select 
        name="oldNew"
        options={valueOptions} 
        placeholder="old/new " 
        className="ChangeOfJiraTicket__Filter" 
        onChange={HandleValuesChange}
        />
        
        <Select 
        name="status"
        isMulti
        options={statusOptions} 
        placeholder="Status " 
        className="ChangeOfJiraTicket__Filter"
        onChange={HandleStatusChange}
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
        className="ChangeOfJiraTicket__Filter" 
        type="date" 
        name="startDate" 
        onChange={HandleStartDateChange} 
        />

        <input 
        className="ChangeOfJiraTicket__Filter" 
        type="date" 
        name="endDate" 
        onChange={HandleEndDateChange} 
        />

        <Select 
        name="labels"
        options={labelOptions} 
        placeholder="Label" 
        className="ChangeOfJiraTicket__Filter" 
        onChange={HandleLabelChange} 
        />
    
      </form>
    </div>
  )

}


export default ChangesInJiraTickets;