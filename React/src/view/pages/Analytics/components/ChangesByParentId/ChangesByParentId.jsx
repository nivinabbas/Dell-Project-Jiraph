import React from 'react';
import "./ChangesByParentId.css";
import Select from 'react-select'
import { useState , useEffect } from 'react';



function ChangesByParentId() {
  const serverFilters={fixVersion:[],startDate:[],endDate:[]};
  
  // const [UiObjs, setUiObjs] = useState([]);
  
   // Options To get From Server 
   const [fixVersionOptions,setfixVersionOptions]=useState([])

  // Functions ==> Fetch :
  const render = (serverFilters)=> {
    fetch('/api/analytics/ChangesByParentId/', {
        method: 'POST',
        body: JSON.stringify(serverFilters),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => { console.log(data) })
      } 
      
  useEffect(() => {
    fetch('/api/analytics/')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setfixVersionOptions(data);
      })
}, [])

  const HandlefixVersionChange=(version=>{
    serverFilters.fixVersion=[version.label];
    render (serverFilters);
})

    const HandleStartDateChange=(date=>{
      serverFilters.startDate=[date.target.value];
        render (serverFilters);
    })
    
      const HandleEndDateChange=(date=>{
        serverFilters.endDate=[date.target.value];
        render (serverFilters);
    })
  
  return (

    <div className='ChangesByParentIdWrapper'>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      <div className="ChangesByParentId__Title">Changes By Parent Id</div>
     
      {/* Select Filters */}

      <form className="ChangesByParentId__Filters">

        <Select 
        name="fixVersion"
        options={fixVersionOptions} 
        placeholder="fix Version " 
        className="ChangesByParentId__Filter" 
        onChange={HandlefixVersionChange}
        
        />
        
        
        <input 
        className="ChangesByParentId__Filter" 
        type="date" 
        name="startDate" 
        onChange={HandleStartDateChange} 
        />

        <input 
        className="ChangesByParentId__Filter" 
        type="date" 
        name="endDate" 
        onChange={HandleEndDateChange} 
        />
    
      </form>
      <div className="ChangesByParentId__Chart">
 
      </div>
    </div>
  )

}


export default ChangesByParentId;