import { useHistory } from "react-router-dom";
import React from 'react';
import './Login.css';
// import Cookies from "js-cookie";
import {
    Link
} from "react-router-dom";



function Login(props) {
    const history = useHistory();
    let error='';

    function handleLogin(e) {
        e.preventDefault();

        const { userEmailInp, userPswInp } = e.target.elements;
        const email = userEmailInp.value;
        const password = userPswInp.value;

        fetch('/api/users/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { success } = data;
                const { error } = data;
                if (success) {
                    const { info } = data;
                    // const obj = Cookies.get("token");

                    if (info.role === 'Admin') {
                        history.replace("/Admin")
                    }
                    if (info.role === 'QA manager') {
                        history.replace("/status")
                    }
                    if (info.role === 'TOP manager') {
                        history.replace("/analysis")
                    }
            
                }

                else {
                    const { error } = data;
                    alert(error)

                }

            });
    }
    return (
        <div className='login-wrapper'>
            <div className="block"></div>
            <div className="login">
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
            <h3 className="header">Welcome to Jiraph System</h3>
            <form id="loginForm" onSubmit={handleLogin} >
                <input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Email Adress"></input>
                <input  id="userPsw-Inp" type="password" name="userPswInp" placeholder="Enter your Password"></input>
                <button type="submit">LOGIN</button>
            </form>
            <Link className="forgetPassword" to="/forgotPassword">Forgot Password?</Link>
            </div>
        </div>
    )
}

export default Login;

