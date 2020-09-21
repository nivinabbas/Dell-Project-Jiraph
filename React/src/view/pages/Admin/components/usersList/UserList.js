import React, { useState, useEffect } from 'react';
import './UserList.css'
import { useHistory,Link } from "react-router-dom";



//import component
import UserRow from './UserRow';


function UserList() {


    const [users, setUsers] = useState([]);
    const [acivePage, setAcivePage] = useState(false)
    const history = useHistory();



    //show active users list
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


    //show create row 
    return (


        <div className='adminpage'>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
            <div className='header__Admin'>Admin</div>
        <button className="audit__btn" onClick={e=>{goToAudit(e)}}>Go to audit page </button>
            <div >
                {!acivePage ?
                   < button className="showNotActive__btn" onClick={e=>{goToNotActiveUsers(e)}}>Show Not Active</button>
                   :
                   <button className="showActive__btn" onClick={e=>{goToActiveUsers(e)}}>Show Active</button>
                }
               
            </div>
           
            <form className="filters" name='create' onSubmit={createUser} >

                <input className="filter"  name="inputName" type="text" placeholder='Enter Name' required ></input>
                <input className="filter"  name="inputEmail" type="email" placeholder='Enter Email' required ></input>
                <select className="filter"  name="inputRole" required  >
                    <option value="Admin">Admin</option>
                    <option value="QA manager">QA manager</option>
                    <option value="TOP manager">TOP manager</option>
                </select>
                <input className="filter" name="inputPassword" type="password" placeholder='Enter password' required ></input>
                <button type='submit'>CREATE</button>
            </form>
            :

            {/* sho users list using component              */}
            {users.map(user => <UserRow isActive={user.active} setUsers={setUsers} key={user.id} user={user} />)}

           
        </div>
        
    )

    //button send you to active users (default)
    function goToActiveUsers(e) {
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


    //button send you to- not active users 
    function goToNotActiveUsers(e) {
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
    
    //go to audit page 
    function goToAudit(e) {
        history.push("/Audit");

    }

    //creating user function 
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



