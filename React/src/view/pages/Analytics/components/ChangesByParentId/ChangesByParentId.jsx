import React from 'react';
import "./ChangesByParentId.css";
import Select from 'react-select'

import { useState , useEffect } from 'react';



function ChangesByParentId() {

  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);

  // Options To Send == > Server 
  const [ fixVersion , setfixVersion ]=useState([])
  const [ startDate,setStartDate ]=useState([])
  const [ endDate,setEndDate ]=useState([] )

  

   // Options To get From Server 
   const [fixVersionOptions,setfixVersionOptions]=useState([])

  
 
  // Functions ==> Fetch :
  const render = ()=> {
    fetch('/api/analytics/ChangesByParentId/---', {
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
    setfixVersion([version.value])
    

    render ();
})

    const HandleStartDateChange=(date=>{
        console.log(date.value)
        setStartDate(date.target.value)
        render ();
    })
    
      const HandleEndDateChange=(date=>{
        console.log(date.value)
        setEndDate(date.target.value)
     
    
        render ();
    })
  
  return (

    <div className='ChangesByParentIdWrapper'>
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