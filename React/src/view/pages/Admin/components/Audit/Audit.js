import React, { useState, useEffect } from 'react';
import './Audit.css'

import AuditRow from './AuditRow';

var d = new Date();


const serverFilters = { UserName: [], Email: [], Role: [], startDate: (new Date(d.setMonth(d.getMonth()-1))), endDate: new Date() };


function UserAudit() {

  
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // In this fetch We send to the server the Date Range to get the table filtered by date
        fetch('/api/users/getUsersAudit', {
            method: 'POST',
            body: JSON.stringify({ UserName: serverFilters.UserName, startDate:serverFilters.startDate, endDate:serverFilters.endDate  }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(data => {
                
                if (data.success == true) {
                   
                    setUsers(data.info.table);
                }
                else {
                    alert(data.error)
                }
            })
    }, []);



const render = (serverFilters) => {
    fetch('/api/users/getUsersAudit', {
      method: 'POST',
      body: JSON.stringify({ UserName: serverFilters.UserName, startDate:serverFilters.startDate, endDate:serverFilters.endDate}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
                   
            setUsers(data.info.table);
            console.log(data.info.table)
        }
        else {
            alert(data.error)
            setUsers([]);
        }
      })
  }

    // Function for handle the change of Start Date, to filter the Audit table by Date Range  
    const handleChangeStartDate = (change => {
        console.log(change.target.value)
        serverFilters.startDate = new Date(change.target.value);
        render(serverFilters);
      })
    

      // Function for handle the change of End Date, to filter the Audit table by Date Range  
      const handleChangeEndDate = (change => {
        serverFilters.endDate = new Date(change.target.value);
        render(serverFilters);
      })
    


    return (

        <div className='adminpage'>
            <div className="ModificationByField__Filters">
            <label >From:</label>
            <input
          className="ModificationByField__Filter__date"
          type="date"
          name="startDate"
           onChange={handleChangeStartDate}
        />

        <label >To:</label>
        <input
          className="ModificationByField__Filter__date"
          type="date"
          name="endDate"
           onChange={handleChangeEndDate}
        />
        </div>
            <div id="header">
            </div>
            <div className='AdminTable'>
                <div className="TableColHeeader">
                    <h4>Username</h4>
                    <h4>E-Mail</h4>
                    <h4> Role</h4>
                    <h4>Action</h4>
                    <h4>Date & Time</h4>
                </div>
              
                
                {users.map(user => <AuditRow setUsers={setUsers} key={user.id} user={user} />)}
            </div>

        </div>
    );

    
}

export default UserAudit;



