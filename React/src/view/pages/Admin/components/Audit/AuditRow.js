import React from 'react';
import './Audit.css'


export default props => {

    const { user, setUsers } = props;
 
    return (
        <form id={user.id} className="TableBody" >

            <input name="name" type="text" defaultValue={user.name} ></input>
            <input  type="email" name='email' defaultValue={user.email}></input>
            <input  type="text" name='role' defaultValue={user.role}></input>
            <input name="inputAction" type="text" defaultValue={user.action} ></input>
            <input name="inputDate" type="text" defaultValue={user.date} ></input>
               
            
        </form>
    )

}