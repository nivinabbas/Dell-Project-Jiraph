import React, { useState, useEffect } from 'react';
import './Audit.css'

import AuditRow from './AuditRow';


//-----------------------------------------------------------change
const serverFilters = { UserName: [], Email: [], Role: [], startDate: (new Date("2020-08-1")), endDate: new Date("2020-09-1") };
//-----------------------------------------------------------change

function UserAudit() {

  
    const [users, setUsers] = useState([]);
    

//-----------------------------------------------------------change

    useEffect(() => {
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






//-----------------------------------------------------------change

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
        }
        else {
            alert(data.error)
        }
      })
  }








    // useEffect(() => {
    //     fetch('/api/users/getUsersAudit')
    //         .then(res => res.json())
    //         .then(data => {
                
    //             if (data.success == true) {
                   
    //                 setUsers(data.info.table);
    //             }
    //             else {
    //                 alert(data.error)
    //             }
    //         })
    // }, []);








    //-----------------------------------------------------------change
    const handleChangeStartDate = (change => {
        console.log(change.target.value)
        serverFilters.startDate = new Date(change.target.value);
        render(serverFilters);
      })
    
      const handleChangeEndDate = (change => {
        serverFilters.endDate = new Date(change.target.value);
        render(serverFilters);
      })
    //-----------------------------------------------------------change






    return (

        <div className='adminpage'>
            <div className="ModificationByField__Filters">
            <input
          className="ModificationByField__Filter__date"
          type="date"
          name="startDate"
        //   onChange={handleChangeStartDate}
        />


        <input
          className="ModificationByField__Filter__date"
          type="date"
          name="endDate"
        //   onChange={handleChangeEndDate}
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



