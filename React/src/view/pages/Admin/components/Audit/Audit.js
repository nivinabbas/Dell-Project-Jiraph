import React, { useState, useEffect } from 'react';
import './Audit.css'
import {
    Link
} from "react-router-dom";


import AuditRow from './AuditRow';

function UserAudit() {

  
    const [users, setUsers] = useState([]);
    


    useEffect(() => {
        fetch('/api/users/getUsersAudit')
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
   
    return (

        

        <div className='adminpage'>
             <div id="ButtonDiv">
                
                <Link to="/Admin"><button>Go to Users List </button> </Link>
                
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



