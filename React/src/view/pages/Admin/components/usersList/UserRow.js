import React, { useState } from 'react';

export default props => {

    const { user } = props;

    const [edit, setEdit] = useState(false)

    return (
        <form id={user.id} onSubmit={onSave} >

            <input name="name" disabled={!edit} type="text" defaultValue={user.name} ></input>
            <input disabled={!edit} type="email" name='email' defaultValue={user.email}></input>
            <select disabled={!edit} type="text" name='role'>
                <option value="Admin">Admin</option>
                <option value="QA manager">QA manager</option>
                <option value="TOP manager">TOP manager</option>
            </select>
            <input disabled={!edit} name='password' type="password" placeholder='Pass'></input>

            {!edit ?
                <button onClick={e => { onEdit(e, user.id) }}>Edit</button>
                :
                <button type='submit'>Save</button>
            }
            <button  onClick={e => { deleteUser(e, user.id) }}>Delete</button>

        </form>
    )

    function onSave(e) {
        e.preventDefault()
        setEdit(false)

        let {name, email, password, role} = e.target.elements;
        name = name.value;
        email = email.value;
        role = role.value;
        password = password.value;

        console.log(name, email, password, role)


        // let counter = 0;
        // let aCells = event.currentTarget.parentElement.parentElement.cells;
        // let aRowContent = [];
        // for (let i = 0; i < aCells.length - 1; i++) {
        //     aCells[i].children[0].disabled = true;
        //     aRowContent.push(aCells[i].children[0].value);

        // };
        // // const newName = aCells[0].children[0].value;
        // // const newEmail = aCells[1].children[0].value;
        // // const newRole = aCells[2].children[0].value;
        // // const newPassword = aCells[3].children[0].value;

        // setName(aCells[0].children[0].value);
        // setEmail(aCells[1].children[0].value);
        // setRole(aCells[2].children[0].value);
        // setPassword(aCells[3].children[0].value);
        // setId('1');

        // console.log(name, email, role, password, id)




        // let btnsCellsPos = aCells.length - 1;
        // aCells[btnsCellsPos].children[0].style.display = "initial";
        // aCells[btnsCellsPos].children[1].style.display = "none";

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


    function onEdit(e) {
        e.preventDefault();
        setEdit(true)
        // let aCells = event.currentTarget.parentElement.parentElement.cells;
        // let counter = 0;
        // for (let i = 0; i < aCells.length - 1; i++) {
        //     counter++;
        //     aCells[i].children[0].disabled = false
        // }
        // let btnsCellsPos = aCells.length - 1;
        // console.log(aCells[btnsCellsPos]);
        // aCells[btnsCellsPos].children[0].style.display = "none";
        // aCells[btnsCellsPos].children[1].style.display = "initial";


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
}