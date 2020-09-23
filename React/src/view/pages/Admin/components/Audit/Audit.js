import React, { useState, useEffect } from 'react';
import './Audit.css'
import {
    Link,
    useHistory
} from "react-router-dom";


import AuditRow from './AuditRow';

var d = new Date();

//-----------------------------------------------------------change
const serverFilters = { UserName: [], Email: [], Role: [], startDate: (new Date(d.setMonth(d.getMonth()-1))), endDate: new Date() };
//-----------------------------------------------------------change

function UserAudit() {

  
    const [users, setUsers] = useState([]);

    const history = useHistory();
    

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
            console.log(data.info.table)
        }
        else {
            alert(data.error)
            setUsers([]);
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
          <button onClick={backTouserList}>back to userList</button>
            <div className="ModificationByField__Filters">
            Start date :
            <input
          className="ModificationByField__Filter__date"
          type="date"
          name="startDate"
           onChange={handleChangeStartDate}
        />

        End date :
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
                <div className="TableColHeeader2">
                    <h4 className="table-haader-item">Username</h4>
                    <h4 className="table-haader-item">E-Mail</h4>
                    <h4 className="table-haader-item"> Role</h4>
                    <h4 className="table-haader-item">Action</h4>
                    <h4 className="table-haader-item">Date & Time</h4>
                </div>
              
                
                {users.map(user => <AuditRow setUsers={setUsers} key={user.id} user={user} />)}
            </div>

        </div>
    );


    //back to userlist
    function backTouserList(){
      history.push("/Admin");

    }

    
}

export default UserAudit;



