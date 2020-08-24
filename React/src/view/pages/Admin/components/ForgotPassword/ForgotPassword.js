import React  from 'react';
import './ForgotPassword.css';
import {
    Link
  } from "react-router-dom";

function ForgotPassword(props) {
 

    return (
        <div className='forgotPassword'>
            <h3>Welcome to Jiraph System</h3>
            <input id="userEmail-Inp" name="userEmail-Inp" placeholder="Enter your Emailadress"></input>

            <button onClick={handleForgotPsw()}>Send</button>
   
        </div>
    )
}
function handleForgotPsw() {
    
}

export default ForgotPassword;