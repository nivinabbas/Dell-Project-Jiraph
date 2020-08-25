import { useHistory } from "react-router-dom";
import React from 'react';



function usersList() {




function getUserList() {
    

    fetch('/api/getUserList')
        .then(res => res.json())
        .then(data => {
            let data1 = data;
            let list = '';
            


        })
    }



    function createUser(e) {
        e.preventDefault();
        const name = e.target.element.name.value
        const email = e.target.element.email.value
        const role = e.target.element.role.value
        const password = e.target.element.password.value;

        fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify({ name, email, role, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data = true) {
                    return ('created sucsses')
                }
                else if (data = false) {
                    return ('not sucsses ')
                }

            })
    }




    function editUser(email) {
        e.preventDefault();
        const email = e.target.element.email.value;

        fetch('/api/editUser', {
            method: 'POST',
            body: JSON.stringify({ name, email, role, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data = true) {
                    return ('update sucsses')
                }
                else if (data = false) {
                    return ('Not update ')
                }})

            }
        
 

        

    function deleteUser(email) {
        e.preventDefault();
        const email = e.target.element.email.value;
        fetch('/api/deleteUser', {
            method: 'Delete',
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data = true) {
                    return ('Deleted sucsses')
                }
                else if (data = false) {
                    return ('Not found ')
                }

            })

        }
    }
    
    

export default usersList ;



