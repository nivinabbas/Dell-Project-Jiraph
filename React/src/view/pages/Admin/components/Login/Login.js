import { useHistory } from "react-router-dom";
import React from 'react';
import './Login.css';
import {
    Link
} from "react-router-dom";



function Login(props) {
    const history = useHistory();


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
        <div className='login'>
            <h3>Welcome to Jiraph System</h3>
            <form id="loginForm" onSubmit={handleLogin} >
                <input id="userEmail-Inp" name="userEmailInp" placeholder="Enter your Emailadress"></input>
                <input id="userPsw-Inp" name="userPswInp" placeholder="Enter your Password"></input>
                <button type="submit">Login</button>
            </form>
            <Link to="/forgotPassword">Forgot Password?</Link>
            <div className='res'></div>

        </div>
    )
}

export default Login;

