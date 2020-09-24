import React from 'react';
import { useHistory } from "react-router-dom";
import Login from "../Login/Login"
import './ChangePassword.css'
import {
    useParams
} from "react-router-dom";

// import './ChangePassword.css'
// import './ForgetPassword.css'



//function to change the password 
function ChangePassword(props) {
    const history = useHistory();
    const { email } = useParams();
    console.log('email Change password:', email)

    //function to Change the password after check if 2 input is the same
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
                    console.log(success)
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
        <div className='changePassword_wrapper'>
            <div className="changePassword2">
            <div className="header__changePass">
            <div className="header">Enter the new password</div>

            <form id="resetPasswordForm" onSubmit={onResetPassword} >
                <input id="resetNPswInp" type="password" name="resetNPswInp" placeholder="choose a new password"></input>
                <input id="confirmNPswInp" type="password" name="confirmNPswInp" placeholder="confirm the new password"></input>
                <button type="submit">Save</button>
            </form>
            </div>
            </div>
        </div>
    )
}




export default ChangePassword;