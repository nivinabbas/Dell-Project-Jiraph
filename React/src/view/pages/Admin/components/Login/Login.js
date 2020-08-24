import React  from 'react';
import './Login.css';
import {
    Link
  } from "react-router-dom";

function Login(props) {
 

    return (
        <div className='login'>
            <h3>Welcome to Jiraph System</h3>
            <input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Emailadress"></input>
            <input id="userPsw-Inp" name="userPswInp" placeholder="Enter your Password"></input>
            <button onClick={handleLogin()}>Login</button>
            <Link to="/forgotPassword">Forgot Password?</Link>
        </div>
    )
}
function handleLogin(event) {
    let userEmail = event;
}

export default Login;