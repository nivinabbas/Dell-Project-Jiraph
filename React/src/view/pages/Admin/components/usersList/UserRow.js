import React, { useState } from 'react';
import './UserList.css'
export default props => {
    //--------------------------------
    const {isActive} = props ; 
    const { user, setUsers } = props;
    const [edit, setEdit] = useState(false);
   //-----------------------------------------
    //show users list 
    return (
        <form id={user.id} className="TableBody_UserList" onSubmit={(e => onSave(e, user.id))} >
            <input id="item" name="name" disabled={!edit} type="text" defaultValue={user.name} ></input>
            <input id="item" disabled={!edit} type="email" name='email' defaultValue={user.email}></input>
            <select  id="item__slt"  disabled={!edit} type="text" name='role' defaultValue={user.role}>
                <option value="Admin">Admin</option>
                <option value="QA manager">QA manager</option>
                <option value="TOP manager">TOP manager</option>
            </select>
            
                <input id="item" disabled={!edit} className={edit ? 'inset' : ''} name='password' type="password" placeholder='Password'></input>
            
            
                {!edit ?
                    <button id="item__btn__edit" className="edit__Btn" onClick={e => { onEdit(e, user.id) }}>Edit</button>
                    :
                    <button id="item__btn__save" className="save__Btn" type='submit'>Save</button>
                }
                
                
                    {isActive ?
                        <button  className="item1" id="item__btn__delete" onClick={e => { deleteUser(e, user.id) }}>Delete</button>
                        :
                        <button className="item1" onClick={e => { activeUser(e, user.id) }}>Activate</button>
                    }
                
        </form>
    )
    //activating user function 
    function activeUser(e, id) {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to Active this User?')) {
            alert("Not Activated")
            return;
        }
        fetch('/api/users/activeUser', {
            method: 'PUT',
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    setUsers(data.info.table);
                    return alert('Activated sucsses')
                }
                else if (data.success == false) {
                    alert(data.error)
                }
            })
    }
    //save after updating user 
    function onSave(e, id) {
        e.preventDefault()
        setEdit(false)
        let { name, email, password, role } = e.target.elements;
        name = name.value;
        email = email.value;
        role = role.value;
        password = password.value;
        e.target.elements.password.value = '';
        fetch('/api/users/editUser', {
            method: 'PUT',
            body: JSON.stringify({ id, name, email, role, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    alert('update sucsses');
                }
                else if (data.success == false) {
                    alert(data.error)
                }
            })
    }
    //give the option to edit 
    function onEdit(e) {
        e.preventDefault();
        setEdit(true)
    }
    //deleting user function 
    function deleteUser(e, id) {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to delete this User?')) {
            alert("Not Deleted")
            return;
        }
        fetch('/api/users/deleteUser', {
            method: 'PUT',
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    setUsers(data.info.table);
                    return alert('Deleted sucsses')
                }
                else if (data.success == false) {
                    alert(data.error)
                }
            })
    }
}