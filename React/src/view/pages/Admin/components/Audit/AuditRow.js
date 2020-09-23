import React from 'react';
import './Audit.css'


export default props => {

    const { user, setUsers } = props;
 
    return (
        <div className="auditRow-wrapper">
        <form id={user.id} className="TableBody2" >

            <input className="input__TableBody__item" name="name" type="text" defaultValue={user.name} ></input>
            <input className="input__TableBody__item"   type="email" name='email' defaultValue={user.email}></input>
            <input className="input__TableBody__item"   type="text" name='role' defaultValue={user.role}></input>
            <input className="input__TableBody__item"  name="inputAction" type="text" defaultValue={user.action} ></input>
            <input className="input__TableBody__item"  name="inputDate" type="text" defaultValue={user.date} ></input>
               
            
        </form>
        </div>
    )

}