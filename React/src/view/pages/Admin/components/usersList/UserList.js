import React, { useState } from 'react';
import './UserList.css'




function UserList() {
    const [users, setUsers] = useState([]);

    let products = [
        { name: 'Cheese', email: 'mhmod@gmail.com', role: 4.9, password: 20 },
        { name: 'Milk', email: 'mhmod@gmail.com', role: 1.9, password: 32 },
        { name: 'Yoghurt', email: 'mhmod@gmail.com', role: 2.4, password: 12 },
        { name: 'Heavy Cream', email: 'mhmod@gmail.com', role: 3.9, password: 9 },
        { name: 'Butter', email: 'mhmod@gmail.com', role: 0.9, password: 99 },
        { name: 'Sour Cream ', email: 'mhmod@gmail.com', role: 2.9, password: 86 },
        { name: 'Fancy French Cheese :fr:', email: 'mhmod@gmail.com', role: 99, password: 12 },
    ]


    
    function getUserList() {
        fetch('/api/users/getUserList')
            .then(res => res.json())
            .then(data => {
                setUsers(users);
            })
    
    
        }

    return (
        <div className='adminpage'>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th type='password'>Password</th>
                </tr>
                <tbody>
                    {
                        products.map((item, index) => (
                            <tr>
                                <td><input id="name" disabled type="text" defaultValue={item.name}></input></td>
                                <td ><input id="email" disabled type="email" defaultValue={item.email}></input></td>
                                <td ><input id="role" disabled type="text" defaultValue={item.role}></input></td>
                                <td ><input id="password" disabled type="password" defaultValue={item.password}></input></td>

                                <td>
                                    <button id="editBtn" onClick={onEdit}>Edit</button>
                                    <button id="saveBtn" onClick={onSave}>Save</button>
                                    <button onClick={deleteUser}>Delete</button>
                                </td>
                            </tr>
                        ))
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
            aCells[i].children[0].disabled = true
            aRowContent.push(aCells[i].children[0].value);

        };
        let btnsCellsPos = aCells.length - 1;
        aCells[btnsCellsPos].children[0].style.display = "initial";
        aCells[btnsCellsPos].children[1].style.display = "none";
        

        // e.preventDefault();
        // const name = e.target.element.name.value;
        // const email = e.target.element.email.value;
        // const role = e.target.element.role.value;
        // const password = e.target.element.password.value;



        fetch('/api/users/editUser', {
            method: 'POST',
            body: JSON.stringify(),
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

    function deleteUser() {
            // e.preventDefault();
            // const email = e.target.element.email.value;
            fetch('/api/users/deleteUser', {
                method: 'Delete',
                body: JSON.stringify(),
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

    // function createUser(e) {
    //     e.preventDefault();
    //     const name = e.target.element.name.value
    //     const email = e.target.element.email.value
    //     const role = e.target.element.rolue.value
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




export default UserList;



