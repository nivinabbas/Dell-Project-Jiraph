import { useHistory } from "react-router-dom";
import React from 'react';
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import './Login.css';
// import Cookies from "js-cookie";
import {
    Link
} from "react-router-dom";
import { useEffect } from "react";
import logo from "./img/JiraphLogo.jpg";


function Login(props) {
    const history = useHistory();
    let error='';
    Cookies.remove('loginToken');

     function handleLogin(e) {
        e.preventDefault();

        const { userEmailInp, userPswInp } = e.target.elements;
        const email = userEmailInp.value;
        const password = userPswInp.value;

        //fetch to login user 
        fetch('/api/users/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let token = Cookies.get('loginToken');
                if(token!=null){
                    const decoded = jwt.decode(token);
                    if(decoded.role==='Admin')
                    history.replace("Admin")
                    if(decoded.role==="QA manager")
                    history.replace("/status")
                    if(decoded.role==="TOP manager")
                    history.replace("/analysis")
                }
                else 
                alert("User Not Found")

            });
    }
    return (
        <div className='login-wrapper'>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
            {/* <div className="header__login">
                    <img className="jiraph__logo" src={logo} alt="this is a logo" />           
                Welcome to Jiraph System 
            </div> */}
            
            <div className="login">
            <div className="sidebar__header-wrapper">
                    <img className="jiraph__logo__login" src={logo} alt="this is a logo" />           
                Welcome to Jiraph System 
            </div>
            <form id="loginForm" onSubmit={handleLogin} >
                <input className="loginForm__input" id="userEmail-Inp" name="userEmailInp" placeholder="Enter your email adress" required></input>
                <input  className="loginForm__input" id="userPsw-Inp" type="password" name="userPswInp" placeholder="Enter your password" required></input>
                <button className="loginForm__btn" type="submit">LOGIN</button>
            </form>
            <Link className="forgetPassword" to="/forgotPassword">Forgot Password?</Link>
            </div>
        </div>
    )
}

export default Login;

