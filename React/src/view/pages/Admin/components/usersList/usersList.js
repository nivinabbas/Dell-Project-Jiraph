import { useHistory } from "react-router-dom";
import React from 'react';



function usersList() {

    let products = [
        { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
        { id: 2, name: 'Milk', price: 1.9, stock: 32 },
        { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
        { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
        { id: 5, name: 'Butter', price: 0.9, stock: 99 },
        { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
        { id: 7, name: 'Fancy French Cheese :fr:', price: 99, stock: 12 },
    ]
    return (
        <div className='adminpage'>
            <table>
                <tr>
                    <th>prduct id</th>
                    <th>name</th>
                    <th>price</th>
                </tr>
                <tbody>
                    {
                        products.map((item, index) => (
                            <tr>
                                <td><input id="items" disabled type="text" defaultValue={item.id}></input></td>
                                <td ><input id="items" disabled type="text" defaultValue={item.name}></input></td>
                                <td ><input id="items" disabled type="text" defaultValue={item.price}></input></td>
                                <td>
                                    <button id="editBtn" onClick={onEdit}>Edit</button>
                                    <button id="saveBtn" onClick={onSave}>Save</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
    function onEdit(event) {
        let aCells = event.currentTarget.parentElement.parentElement.cells;
        let counter = 0;
        for (let i = 0; i < aCells.length - 1; i++) {
            counter++;
            aCells[i].children[0].disabled = false
        }
         debugger;
         let btnsCellsPos = aCells.length-1;
         console.log(aCells[btnsCellsPos]);
          aCells[btnsCellsPos].children[0].style.display = "none";
          aCells[btnsCellsPos].children[1].style.display = "initial";
    }
    function onSave(event) {
        let counter = 0;
        let aCells = event.currentTarget.parentElement.parentElement.cells;
        let aRowContent = [];
        for (let i = 0; i < aCells.length - 1; i++) {
            aCells[i].children[0].disabled = true
            aRowContent.push(aCells[i].children[0].value);
            debugger;
        }
console.log(aRowContent);
        // position of Buttons:
        let btnsCellsPos = aCells.length-1;
         aCells[btnsCellsPos].children[0].style.display = "initial";
         aCells[btnsCellsPos].children[1].style.display = "none";
    }

}


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




    // function editUser(email) {
    //     e.preventDefault();
    //     const email = e.target.element.email.value;

    //     fetch('/api/editUser', {
    //         method: 'POST',
    //         body: JSON.stringify({ name, email, role, password }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data = true) {
    //                 return ('update sucsses')
    //             }
    //             else if (data = false) {
    //                 return ('Not update ')
    //             }})

    //         }
        
 

        

    // function deleteUser(email) {
    //     e.preventDefault();
    //     const email = e.target.element.email.value;
    //     fetch('/api/deleteUser', {
    //         method: 'Delete',
    //         body: JSON.stringify({ email }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data = true) {
    //                 return ('Deleted sucsses')
    //             }
    //             else if (data = false) {
    //                 return ('Not found ')
    //             }

    //         })

    //     }
    
    
    

export default usersList ;



