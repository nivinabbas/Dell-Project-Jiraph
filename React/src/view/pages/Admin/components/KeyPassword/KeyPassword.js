import React from 'react';
import { useHistory } from "react-router-dom";
import ChangePassword from "../ChangePassword/ChangePassword"
import {
    useParams
} from "react-router-dom";

import './KeyPassword.css'


function KeyPassword(props) {
    const history = useHistory();
    const { email } = useParams();
    // console.log('email:', email)



    function onConfirmCode(e) {
        e.preventDefault();

        const { confCodeInp } = e.target.elements;
        const key = confCodeInp.value;


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
            <form className="confirmCodeForm" onSubmit={onConfirmCode} >
                <input id="confCodeInp" name="confCodeInp" placeholder="Enter your confirmation code"></input>
                <button type="submit">CONFIRM</button> 
            </form>
        </div>

    )
}
export default KeyPassword;