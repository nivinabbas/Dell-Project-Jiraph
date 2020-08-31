import React, { useState, useEffect } from 'react';
import './UserList.css'

//components
import UserRow from './UserRow';


function UserList() {
    const [users, setUsers] = useState([]);
    //-------------------------------------
    

    useEffect(() => {
        fetch('/api/users/getUsersList')
            .then(res => res.json())
            .then(data => {
                if (data.success == true) {
                    setUsers(data.info.table);
                }
                else {
                    console.log(data.error)
                }
            })
    }, []);



    return (



        <div className='adminpage'>


            <form id='Names'>
                <h1>Name</h1>
                <h2>Email</h2>
                <h3>Role</h3>
                <h4>password</h4>
            </form>

            <form name='create' onSubmit={createUser} >

                <input name="inputName" type="text" placeholder='Enter Name' required ></input>
                <input name="inputEmail" type="email" placeholder='Enter Email' required></input>
                <select name="inputRole" required >
                    <option value="Admin">Admin</option>
                    <option value="QA manager">QA manager</option>
                    <option value="TOP manager">TOP manager</option>
                </select>
                <input name="inputPassword" type="password" placeholder='Enter pass' required></input>
                <button type='submit'>Create</button>
            </form>


            { users.map((user, index) => <UserRow key={index+'users'} user={user} /> )}



        </div>
    )


    function createUser(e) {
        e.preventDefault();
        let {inputName, inputEmail, inputRole, inputPassword} = e.target.elements;
        inputName = inputName.value;
        inputEmail = inputEmail.value;
        inputRole = inputRole.value;
        inputPassword = inputPassword.value;

        //  console.log(inputName, inputEmail, inputRole, inputPassword)


        fetch('/api/users/createUser', {
            method: 'POST',
            body: JSON.stringify({name:inputName,email: inputEmail, role:inputRole,password: inputPassword}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.info.table)
                // if (data.success = true) {
                //     setUsers(data.info.table)
                //     console.log(data.info.table)
                //     return (alert('created sucsses'))
                // }
                // else if (data = false) {
                //     return (alert(data.error))
                // }

            })
    }

}



export default UserList;



