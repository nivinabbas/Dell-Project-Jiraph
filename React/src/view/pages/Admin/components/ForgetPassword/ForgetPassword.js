import React from 'react';
import { useHistory } from "react-router-dom";
import './ForgetPassword.css'
function Forgotpassword(props) {
    let history = useHistory();

    return (
        <div className='forgotpassword'>
            <h2>Password Reset</h2>
            <form id="sendToMailForm" onSubmit={onSendToMail} >
                <input id="sendToMailInput" name="sendToMailInput" placeholder="1. enter your login Emailadress"></input>
                <button type="submit">Submit</button>
            </form>
            <form id="confirmCodeForm" onSubmit={onConfirmCode} >
                <input id="confCodeInp" name="confCodeInp" placeholder="Enter your confirmation code"></input>
                <button type="submit">Confirm</button>
            </form>
            <form id="resetPasswordForm" onSubmit={onResetPassword} >
                <input id="resetNPswInp" name="resetNPswInp" placeholder="Choose a new Password"></input>
                <input id="confirmNPswInp" name="confirmNPswInp" placeholder="confirm the new Password"></input>
                <button type="submit">Save</button>
            </form>
        </div>
    );
    // function to send the confirmation code to email
    function onSendToMail(e) {
        e.preventDefault();

        const { sendToMailInput } = e.target.elements;
        const email = sendToMailInput.value;


        fetch("/api/users/forgotPassword", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { success } = data;
                const { error } = data;
                const { info } = data;
                if (success == true) {
                    e.target.parentElement.children[1].style.display = "none";
                    e.target.parentElement.children[2].style.display = "initial";
                    e.target.parentElement.children[3].style.display = "none";
                }
                else {
                    console.log("error")
                }
            });
    }
    // function to confirm the received code is correct
    function onConfirmCode(e) {
        e.preventDefault();
        e.target.parentElement.children[1].style.display = "none";
        e.target.parentElement.children[2].style.display = "none";
        e.target.parentElement.children[3].style.display = "initial";
    }
    // function to reset the forotten password
    function onResetPassword(e) {
    }
}
export default Forgotpassword;