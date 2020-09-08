import React, { useState, useEffect } from 'react';
import './UserList.css'
import { useHistory } from "react-router-dom";

import {
    Link
} from "react-router-dom";



//components
import UserRow from './UserRow';


function UserList() {
    const [users, setUsers] = useState([]);
    const history = useHistory();


    //-------------------------------------


    useEffect(() => {
        fetch('/api/users/getUsersList')
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
            <div id="header">
            </div>
            <div className='AdminTable'>
            <button onClick={goToAudit}>Audit</button>
                <div className="TableColHeeader">
                    <h4>Username</h4>
                    <h4>E-Mail</h4>
                    <h4>Business Role</h4>
                    <h4>Password</h4>
                </div>
                <form name='create' onSubmit={createUser} className='TableCreateRow' >

                    <input name="inputName" type="text" placeholder='Enter Name' required ></input>
                    <input name="inputEmail" type="email" placeholder='Enter Email' required ></input>
                    <select name="inputRole" required  >
                        <option value="Admin">Admin</option>
                        <option value="QA manager">QA manager</option>
                        <option value="TOP manager">TOP manager</option>
                    </select>
                    <input name="inputPassword" type="password" placeholder='Enter pass' required ></input>
                    <button id="createBtn" type='submit' > Create</button>
                </form>


                {users.map(user => <UserRow setUsers={setUsers} key={user.id} user={user} />)}


            </div>
        </div>
    )


    function goToAudit(e){
        history.push("/Audit");

    }


    function createUser(e) {
        e.preventDefault();
        let { inputName, inputEmail, inputRole, inputPassword } = e.target.elements;
        inputName = inputName.value;
        inputEmail = inputEmail.value;
        inputRole = inputRole.value;
        inputPassword = inputPassword.value;

        e.target.elements.inputName.value = '';
        e.target.elements.inputEmail.value = '';
        e.target.elements.inputPassword.value = '';

        fetch('/api/users/createUser', {
            method: 'POST',
            body: JSON.stringify({ name: inputName, email: inputEmail, role: inputRole, password: inputPassword }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.success = true) {
                    setUsers(data.info.table)
                    return (alert('created sucsses'))
                }
                else if (data = false) {
                    return (alert(data.error))
                }

            })
    }

   

}



export default UserList;



