import React, { useState, useEffect } from 'react';
import './UserList.css'
import { useHistory } from "react-router-dom";



//components
import UserRow from './UserRow';


function UserList() {
    const [users, setUsers] = useState([]);
    const [acivePage, setAcivePage] = useState(false)

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
        <button onClick={e=>{goToAudit(e)}}>go to audit page </button>
            <div >
                {!acivePage ?
                   <button onClick={e=>{notActive(e)}}>Show Not Active</button>
                   :
                   <button onClick={e=>{activeUsers(e)}}>Show Active</button>
                }
               
            </div>

            
            <form id='Names'>
                <h1>Name</h1>
                <h2>Email</h2>
                <h3>Role</h3>
                <h4>password</h4>
            </form>

            <form name='create' onSubmit={createUser} >

                <input name="inputName" type="text" placeholder='Enter Name' required ></input>
                <input name="inputEmail" type="email" placeholder='Enter Email' required ></input>
                <select name="inputRole" required  >
                    <option value="Admin">Admin</option>
                    <option value="QA manager">QA manager</option>
                    <option value="TOP manager">TOP manager</option>
                </select>
                <input name="inputPassword" type="password" placeholder='Enter pass' required ></input>
                <button type='submit'>Create</button>
            </form>

            {users.map(user => <UserRow setUsers={setUsers} key={user.id} user={user} />)}


        </div>
    )


    function activeUsers(e) {
        e.preventDefault();
        fetch('/api/users/getUsersList')
        .then(res => res.json())
        .then(data => {
            if (data.success == true) {
                console.log(data.success)
                console.log(data.info.table)
                setUsers(data.info.table);
            }
            else {
                alert(data.error)
            }
        })
            setAcivePage(false);
    }



    function notActive(e) {
        console.log('ENTERED')
        e.preventDefault();
        fetch('/api/users/getDeactivatedList')   
            .then(res => res.json())
            .then(data => {
                if (data.success == true) {
                    console.log(data.success)
                    console.log(data.info.table)
                    setUsers(data.info.table);
                    }
                else {
                    alert(data.error)
                }
            })
            setAcivePage(true);

    }

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
                if (data.success == true) {
                    setUsers(data.info.table)
                    return (alert('created sucsses'))
                }
                else if (data.success == false) {
                    return (alert(data.error))
                }

            })
    }



}



export default UserList;



