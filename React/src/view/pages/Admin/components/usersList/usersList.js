import React, { useState, useEffect } from 'react';
import './UserList.css'
function userList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/api/users/getUsersList')
            .then(res => res.json())
            .then(data => {
                setUsers(data.info.table);
            })
    }, []);
    return (
        <div className='adminpage'>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th >Password</th>
                </tr>
                <tbody>
                    <tr>
                        <td><input id="addName" type="text" placeholder='Enter Name' required></input></td>
                        <td ><input id="addEmail" type="email" placeholder='Enter Email' required></input></td>
                        <td ><select id="role" >
                                    <option value="Admin">Admin</option>
                                    <option value="QA manager">QA manager</option>
                                    <option value="TOP manager">TOP manager</option>
                                </select></td>
                        <td ><input id="addPassword" type="password" placeholder='Enter pass' required></input></td>
                        <button id='createBtn' onClick={createUser}>Create</button>
                    </tr>
                    {
                        users.map((item, index) =>
                            <tr>
                                <td><input id="name" disabled type="text" defaultValue={item.name}></input></td>
                                <td ><input id="email" disabled type="email" defaultValue={item.email}></input></td>
                                <td ><select id="role" disabled type="text" >
                                    <option value="Admin">Admin</option>
                                    <option value="QA manager">QA manager</option>
                                    <option value="TOP manager">TOP manager</option>
                                </select></td>
                                <td ><input id="password" disabled type="password" placeholder='Pass'></input></td>
                                <td>
                                    <button id="editBtn" onClick={onEdit}>Edit</button>
                                    <button id="saveBtn" onClick={onSave}>Save</button>
                                    <button onClick={deleteUser}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
    function onEdit(event) {
        let aCells = event.currentTarget.parentElement.parentElement.cells;
        let counter = 0;
        for (let i = 0; i < aCells.length - 1; i++) {
            counter++;
            aCells[i].children[0].disabled = false
        }
        let btnsCellsPos = aCells.length - 1;
        console.log(aCells[btnsCellsPos]);
        aCells[btnsCellsPos].children[0].style.display = "none";
        aCells[btnsCellsPos].children[1].style.display = "initial";
    }
    function onSave(event) {
        let counter = 0;
        let aCells = event.currentTarget.parentElement.parentElement.cells;
        let aRowContent = [];
        for (let i = 0; i < aCells.length - 1; i++) {
            aCells[i].children[0].disabled = true;
            aRowContent.push(aCells[i].children[0].value);
        };
        const newName = aCells[0].children[0].value;
        const newEmail = aCells[1].children[0].value;
        const newRole = aCells[2].children[0].value;
        const newPassword = aCells[3].children[0].value;
        console.log(newName, newEmail, newRole, newPassword)
        let btnsCellsPos = aCells.length - 1;
        aCells[btnsCellsPos].children[0].style.display = "initial";
        aCells[btnsCellsPos].children[1].style.display = "none";
        //
        fetch('/api/users/editUser', {
            method: 'POST',
            body: JSON.stringify(newName, newEmail, newRole, newPassword),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data = true) {
                    return ('update sucsses')
                }
                else if (data = false) {
                    return ('Not update ')
                }
            })
    }
    function deleteUser(event) {
        let aCells = event.currentTarget.parentElement.parentElement.cells;
        const newEmail = aCells[1].children[0].value;
        console.log(newEmail)
        fetch('/api/users/deleteUser', {
            method: 'Delete',
            body: JSON.stringify(newEmail),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data = true) {
                    return ('Deleted sucsses')
                }
                else if (data = false) {
                    return ('Not found ')
                }
            })
    }
}
function createUser(e) {
    fetch('/api/users/createUser', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data = true) {
                return ('created sucsses')
            }
            else if (data = false) {
                return ('not sucsses ')
            }
        })
}
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
export default userList;