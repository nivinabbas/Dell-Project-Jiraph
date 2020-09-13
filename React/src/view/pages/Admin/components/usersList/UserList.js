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
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
            <div className='header__Admin'>Admin</div>

            <form className="filters" name='create' onSubmit={createUser} >

                <input className="filter" name="inputName" type="text" placeholder='Enter the contact name' required ></input>
                <input className="filter" name="inputEmail" type="email" placeholder='Enter the contact Email' required ></input>
                <select className="filter" name="inputRole" required>
                    <option value="Admin">Admin</option>
                    <option value="QA manager">QA manager</option>
                    <option value="TOP manager">TOP manager</option>
                </select>
                <input className="filter" name="inputPassword" type="password" placeholder='Enter password' required ></input>
                <button type='submit'>CREATE</button>
            </form>

            {users.map(user => <UserRow setUsers={setUsers} key={user.id} user={user} />)}


        </div>
    )


    


    function goToAudit(e) {
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



