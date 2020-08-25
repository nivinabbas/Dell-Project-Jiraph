import { useHistory, useState } from "./node_modules/react-router-dom";
import React from './node_modules/react';



function UserList() {
    const [users, setUsers] = useState([]);
    const check = [{ name: 'a', email: 'a' }];
    return (
      
         
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Password</th>

            </tr>


            {
                users.map(user => {
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.Role}</td>
                        <td type='password'>{user.password}</td>
                    </tr>
                })
            }
            <tr>
                <input name='name' placeholder='name' required></input>
                <input name='email' placeholder='Email' required></input>
                <input name='role' placeholder='Role' required></input>
                <input name='password' placeholder='Password' required></input>
                <button onClick='createUser'>Add User</button>
            </tr>



        </table >

        
    )



    function getUserList() {
        fetch('/api/users/getUserList')
            .then(res => res.json())
            .then(data => {
                setUsers(users);
                // return (users);
            })
    }



    // function createUser(e) {
    //     e.preventDefault();
    //     const name = e.target.element.name.value
    //     const email = e.target.element.email.value
    //     const role = e.target.element.role.value
    //     const password = e.target.element.password.value;

    //     fetch('/api/users/createUser', {
    //         method: 'POST',
    //         body: JSON.stringify({ name, email, role, password }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data = true) {
    //                 return ('created sucsses')
    //             }
    //             else if (data = false) {
    //                 return ('not sucsses ')
    //             }

    //         })
    // }




    // function editUser(e) {
    //     e.preventDefault();
    //     const name = e.target.element.name.value;
    //     const email = e.target.element.email.value;
    //     const role = e.target.element.role.value;
    //     const password = e.target.element.password.value;



    //     fetch('/api/users/editUser', {
    //         method: 'POST',
    //         body: JSON.stringify({ name, email, role, password }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data = true) {
    //                 return ('update sucsses')
    //             }
    //             else if (data = false) {
    //                 return ('Not update ')
    //             }
    //         })

    // }





    // function deleteUser(email) {
    //     e.preventDefault();
    //     const email = e.target.element.email.value;
    //     fetch('/api/users/deleteUser', {
    //         method: 'Delete',
    //         body: JSON.stringify({ email }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data = true) {
    //                 return ('Deleted sucsses')
    //             }
    //             else if (data = false) {
    //                 return ('Not found ')
    //             }

    //         })

    // }
}



export default UserList;



