import React from 'react';
import { useHistory } from "react-router-dom";
import ChangePassword from "../ChangePassword/ChangePassword"
import {
    useParams
} from "react-router-dom";

import './KeyPassword.css'

//function to check the sended password 
function KeyPassword(props) {
    const history = useHistory();
    const { email } = useParams();


    function onConfirmCode(e) {
        e.preventDefault();

        const { confCodeInp } = e.target.elements;
        const key = confCodeInp.value;

        //fetch to check the sended password if its the same in email
        fetch("/api/users/checkSendedPassword", {
            method: "POST",
            body: JSON.stringify({ email, key }),
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
                    return (history.push(`/ChangePassword/${email}`))
                }
                else {
                    alert(error)
                }
            }
            )
    }

    return (
        <div className="commitPassword-wrapper">
             <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>

             {/* <h3 className="header">Enter your verification code</h3> */}
            <form className="confirmCodeForm" onSubmit={onConfirmCode} >
                <p className="ver-text">Once you recieve the verification code, enter it here to confirm your identity.</p>
                <input id="confCodeInp" name="confCodeInp" placeholder="Verification code"></input>
                <button type="submit">CONFIRM</button> 
            </form>
        </div>

    )
}
export default KeyPassword;