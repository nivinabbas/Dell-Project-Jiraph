import React from 'react';
import { useHistory } from "react-router-dom";
import Login from "../Login/Login"
import {
    useParams
} from "react-router-dom";

// import './ChangePassword.css'
// import './ForgetPassword.css'




function ChangePassword(props) {
    const history = useHistory();
    const { email } = useParams();
    console.log('email Change password:', email)

    function onResetPassword(e) {
        e.preventDefault();
        const { resetNPswInp, confirmNPswInp } = e.target.elements;
        const password = resetNPswInp.value;
        const password1 = confirmNPswInp.value;
        console.log(password, password1)
        if (password === password1) {
            console.log(email, password)
            fetch("/api/users/updatePassword", {
                method: "PUT",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json())
                .then((data) => {
                    const { success } = data;
                    const { error } = data;
                    if (success) {
                        history.push("/")
                    }
                    else {
                        alert(error)
                    }
                })
        }
        else {
            alert("Password doesn't match")
        }
    }
    return (
        <div className='forgotpassword'>
            <h2>New Password</h2>
            <form id="resetPasswordForm" onSubmit={onResetPassword} >
                <input id="resetNPswInp" type="password" name="resetNPswInp" placeholder="Choose a new Password"></input>
                <input id="confirmNPswInp" type="password" name="confirmNPswInp" placeholder="confirm the new Password"></input>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}




export default ChangePassword;