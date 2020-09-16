import React from 'react';
import { useHistory } from "react-router-dom";
import './ForgetPassword.css'
import KeyPassword from '../KeyPassword/KeyPassword';
import {
    Link
} from "react-router-dom";

function Forgotpassword(props) {
    let history = useHistory();

    // function to send the confirmation code to email
    function onSendToMail(e) {
        e.preventDefault();

        const { sendToMailInput } = e.target.elements;
        const email  = sendToMailInput.value;
        console.log(email)
        
        //fetch to check if email in database
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

                   return(history.push(`/KeyPassword/${email}`))
                 
                }
                else {
                    alert(error)
                }
            });
    }


    return (
        <div className='forgetPassword-wrapper'>
             <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
            <div className="block"></div>
            <div className="forgetPassword">
            <h3 className="header">Password Reset</h3>
            <form id="sendToMailForm" onSubmit={onSendToMail} >
                <input className="sendToMailInput" name="sendToMailInput" placeholder="Enter your Email-adress"></input>
                <button type="submit">SUBMIT</button>
            </form>
            </div>
        </div>
    );
    

}
export default Forgotpassword;