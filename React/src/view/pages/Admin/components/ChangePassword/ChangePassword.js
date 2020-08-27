import React from 'react';
import { useHistory } from "react-router-dom";
import './ChangePassword.css'
import './ForgetPassword.css'




function ChangePassword(props) {
    let history = useHistory();
    let email = props;


    return (
        <div className='forgotpassword'>
            <form id="resetPasswordForm" onSubmit={onResetPassword} >
                <input id="resetNPswInp" name="resetNPswInp" placeholder="Choose a new Password"></input>
                <input id="confirmNPswInp" name="confirmNPswInp" placeholder="confirm the new Password"></input>
                <button type="submit">Save</button>
            </form>
        </div>
    )

    function onResetPassword(e) {
        e.preventDefault();

        const { password } = e.target.elements.resetNPswInp.value;
        const { password1 } = e.target.elements.confirmNPswInp.value;

        if (password === password1) {
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
                        history.push("/Login")
                    }
                    else {
                        console.log(error)
                    }
                })
        }
        else {
            console.log("Password doesn't match")
        }
    }
}




export default ChangePassword;