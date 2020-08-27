import React from 'react';
import { useHistory } from "react-router-dom";
import './ForgetPassword.css'
import KeyPassword from '../KeyPassword/KeyPassword';
function Forgotpassword(props) {
    let history = useHistory();

    return (
        <div className='forgotpassword'>
            <h2>Password Reset</h2>
            <form id="sendToMailForm" onSubmit={onSendToMail} >
                <input id="sendToMailInput" name="sendToMailInput" placeholder="1. enter your login Emailadress"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
    // function to send the confirmation code to email
    function onSendToMail(e) {
        e.preventDefault();

        const { email } = e.target.elements.sendToMailInput.value;
        fetch('/api/users/forgotPassword', {
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
                if (success) {
                    return (<KeyPassword email={email}/>)

        
                }
                else {
                    console.log(error)
                }
            });
    }

}
export default Forgotpassword;