import React, { useState, useEffect } from 'react';
import './UserList.css'




function UserList() {
    const [users, setUsers] = useState([]);
    //-------------------------------------
    const [addName, setAddName] = useState([]);
    const [addEmail, setAddEmail] = useState([]);
    const [addRole, setAddRole] = useState([]);
    const [addPassword, setAddPassword] = useState([]);
    //-------------------------------------------------
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [role, setRole] = useState([]);
    const [password, setPassword] = useState([]);
    const [id, setId] = useState([]);
    //-------------------------------------------------
    const [deleteId, setDeleteId] = useState([]);
    //-----------------------------------------------


    useEffect(() => {
        fetch('/api/users/getUsersList')
            .then(res => res.json())
            .then(data => {
                console.log(data.info.table)
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
                <button id='createBtn'>Create</button>
            </form>


            {


                users.map((item, index) =>
                    <form id='{}' key={index+'users'}>

                        <input name="name" disabled type="text" defaultValue={item.name} ></input>
                        <input id="email" disabled type="email" defaultValue={item.email}></input>
                        <select id="role" disabled type="text" >
                            <option value="Admin">Admin</option>
                            <option value="QA manager">QA manager</option>
                            <option value="TOP manager">TOP manager</option>
                        </select>
                        <input id="password" disabled type="password" placeholder='Pass'></input>

                        <button id="editBtn" onClick={onEdit}>Edit</button>
                        <button id="saveBtn" onClick={onSave}>Save</button>
                        <button id='delete' onClick={e => { deleteUser(e, item.name) }}>Delete</button>

                    </form>)}



        </div>
    )








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
        // const newName = aCells[0].children[0].value;
        // const newEmail = aCells[1].children[0].value;
        // const newRole = aCells[2].children[0].value;
        // const newPassword = aCells[3].children[0].value;

        setName(aCells[0].children[0].value);
        setEmail(aCells[1].children[0].value);
        setRole(aCells[2].children[0].value);
        setPassword(aCells[3].children[0].value);
        setId('1');

        console.log(name, email, role, password, id)




        let btnsCellsPos = aCells.length - 1;
        aCells[btnsCellsPos].children[0].style.display = "initial";
        aCells[btnsCellsPos].children[1].style.display = "none";

        //

        fetch('/api/users/editUser', {
            // newName, newEmail, newRole, newPassword
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success = true) {
                    console.log('update sucsses');
                }
                else if (data.success = false) {
                    console.log('Not update ')
                }
            })


    }



    function deleteUser(e, name) {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to delete this User?')) {
            console.log("Not Deleted")
            return;
        }


        console.log(name);


        fetch('/api/users/deleteUser', {
            method: 'Delete',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success = true) {
                    return ('Deleted sucsses')
                }
                else if (data.success = false) {
                    return ('Not found ')
                }

            })

    }

    function createUser(e) {


        e.preventDefault();

        setAddName(e.target.elements.inputName.value);
        setAddEmail(e.target.elements.inputEmail.value);
        setAddRole(e.target.elements.inputRole.value);
        setAddPassword(e.target.elements.inputPassword.value);

        console.log(addName, addEmail, addRole, addPassword);


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

//         })zsaa

// }




export default UserList;



