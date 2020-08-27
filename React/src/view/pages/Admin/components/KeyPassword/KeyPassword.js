import React from 'react';
import { useHistory } from "react-router-dom";
// import './ForgetPassword.css'


function KeyPassword(props) {
    let history = useHistory();
    let email = props;


    return (
        <div className='forgotpassword'>

            <form id="confirmCodeForm" onSubmit={onConfirmCode} >
                <input id="confCodeInp" name="confCodeInp" placeholder="Enter your confirmation code"></input>
                <button type="submit">Confirm</button>
            </form>

        </div>

    )


    function onConfirmCode(e) {
        e.preventDefault();

        const { confCodeInp } = e.target.elements;
        const { key } = confCodeInp.value;

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
                if (success) {
                    return(<ChangePassword email={email} />)
                    // history.push("/ChangePassword")
                }
                else {
                    console.log(error)
                }
            }
            )
    }
}
export default KeyPassword;