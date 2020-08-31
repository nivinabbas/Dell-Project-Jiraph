import React, { useState } from 'react';

export default props => {

    const { user, setUsers } = props;

    const [edit, setEdit] = useState(false)
    
    
    return (
        <form id={user.id} onSubmit={onSave} >

            <input name="name" disabled={!edit} type="text" defaultValue={user.name} ></input>
            <input disabled={!edit} type="email" name='email' defaultValue={user.email}></input>
            <select disabled={!edit} type="text" name='role' defaultValue={user.role}>
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
            <div>{user.id}</div>
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

        console.log(name, email,role,password)
        fetch('/api/users/editUser', {
            
            method: 'POST',
            body: JSON.stringify({name, email,role,password}),
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


    function deleteUser(e, id) {
        e.preventDefault();
        console.log(id)
        if (!window.confirm('Are you sure you want to delete this User?')) {
            alert("Not Deleted")
            return;
        }
        console.log(id)
        fetch('/api/users/deleteUser', {
            method: 'Delete',
            body: JSON.stringify({id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success = true) {
                    console.log(data.info.table)
                    setUsers(data.info.table);
                    // return alert('Deleted sucsses')
                }
                else if (data.success = false) {
                    alert(data.error)
                }

            })

    }
}