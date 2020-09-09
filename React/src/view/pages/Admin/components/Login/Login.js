import { useHistory } from "react-router-dom";
import React from 'react';
import './Login.css';
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
                    if (info.role === 'Admin') {
                        history.push("/UserList")
                    }
                    if (info.role === 'QA manager') {
                        history.push("/status")
                    }
                    if (info.role === 'TOP manager') {
                        history.push("/analytics")
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
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap" rel="stylesheet"></link>
            <div className="header">           
                <h3>Welcome to Jiraph System</h3>
            </div>
            <div className="login">
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

