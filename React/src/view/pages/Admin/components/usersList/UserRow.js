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



        fetch('/api/users/editUser', {
            
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