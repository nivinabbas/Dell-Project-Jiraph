import React from 'react';
import "./DeletedJiraTickets.css";
import Chart from "../charts/Chart";
import Select from 'react-select'
import ApexChart from '../ApexChart/ApexChart'
import { useState , useEffect } from 'react';


function DeletedJiraTickets() {
  // Default Date 
  const date = new Date()
  const date1MonthAgo = new Date(new Date().setMonth(date.getMonth() - 1));

  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);

  // Options To Send == > Server 
  const [ priority , setPriority ]=useState([])
  const [ functionalTest , setfunctionalTest ]=useState([])
  const [ label  , setLabel ]=useState([])
  const [ qaRepresentative  , setQaRepresentative]=useState([])
  const [ startDate,setStartDate ]=useState(date1MonthAgo)
  const [ endDate,setEndDate ]=useState(date)

  

   // Options To get From Server 
    const [priorityOptions,setPriorityOptions]=useState([])
    const [qaRepresentativeOptions,setQaRepresentativeOptions]=useState([])
    const [functionalTestOptions,setfunctionalTestOptions]=useState([
          { name:"functionalTest" , value: "True"  ,   label: "True"} ,
          { name:"functionalTest" , value: "False"  ,   label: "False"} ,
         ])



   const [labelOptions, setLabelOptions] = useState([
   {name:"label" , value: "Daily"  ,   label: "Daily" },
   {name:"label" , value: "Weekly" ,   label: "Weekly" },
   {name:"label" , value: "Monthly",   label: "Monthly" },
   {name:"label" , value: "Yearly" ,   label: "Yearly" } 
  ])
  
 
  // Functions ==> Fetch : 

  const render = ()=> {
    fetch('/api/analytics/DeletedJiraTickets/---', {
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
        
        //set state (news)
        setUiObjs(data);
      })

      fetch('/api/analytics/----')
      .then(res => res.json())
      .then(data => {
        
        //get priority options 
        setPriorityOptions(data);
      })
}, [])

  
  const HandlePriorityChange=(priority=>{
    console.log(priority.value)
    setPriority([priority.value])
    

    render();
  })
  
  
  const HandlefunctionalTestChange=(status=>{
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

    <div className='DeletedJiraTicketsWrapper'>
      <div className="DeletedJiraTickets__Title">Changes Of Jira Tickets</div>
     
      {/* Select Filters */}

      <form className="DeletedJiraTickets__Filters">

        <Select 
        name="priority"
        options={priorityOptions} 
        placeholder="priority " 
        className="DeletedJiraTickets__Filter" 
        onChange={HandlePriorityChange}
        />
        
        <Select 
        name="functional test"
        isMulti
        options={functionalTestOptions} 
        placeholder="functional-Test " 
        className="DeletedJiraTickets__Filter"
        onChange={HandlefunctionalTestChange}
        />

        <Select 
        name="qaRepresentative"
        isMulti
        options={qaRepresentativeOptions} 
        placeholder="Qa Representative " 
        className="DeletedJiraTickets__Filter"
        onChange={HandleqaRepresentativeChange}
        />

        <input 
        className="DeletedJiraTickets__Filter" 
        type="date" 
        name="startDate" 
        onChange={HandleStartDateChange} 
        />

        <input 
        className="DeletedJiraTickets__Filter" 
        type="date" 
        name="endDate" 
        onChange={HandleEndDateChange} 
        />

        <Select 
        name="labels"
        options={labelOptions} 
        placeholder="Label" 
        className="DeletedJiraTickets__Filter" 
        onChange={HandleLabelChange} 
        />
    
      </form>
    </div>
  )

}


export default DeletedJiraTickets;