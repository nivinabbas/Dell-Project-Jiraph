import { useHistory } from "react-router-dom";
import React from 'react';
import './Login.css';
import {
    Link
  } from "react-router-dom";



function Login(e) {
    e.preventDefault();

    const { Email, Password } = e.target.elements;
    const email = Email.value;
    const password = Password.value;

    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const {success} = data;
            if(success==true){
                const {info} = data;
                console.log(info.role)
            }
            else{
                const {error} = data
                console.log(error)
            }
            if (loggedin) {
                history.push("/main");
            } else {
                document.getElementById("badmsg").innerText = "User Not Exist's";
            }
        });
}
    return (
        <div className='login'>
            <h3>Welcome to Jiraph System</h3>
            <input id="userEmail-Inp" name="userEmail-Inp" placeholder="Enter your Emailadress"></input>
            <input id="userPsw-Inp" name="userPsw-Inp" placeholder="Enter your Password"></input>
            <button onClick={handleLogin()}>Login</button>
            <Link to="/forgotPassword">Forgot Password?</Link>
        </div>
    )
}
function handleLogin(event) {
    let userEmail = event;
}

export default Login;