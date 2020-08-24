import React from 'react'



function getUserList(e) {
    e.preventDefault();

    fetch('/api/getUserList')
        .then(res => res.json())
        .then(data => {
            let data1 = data;
            let list = '';

        })





function createUser(e){
    e.preventDefault();
    const name = e.target.element.value 
    const email = e.target.element.value 
    const role = e.target.element.value 
    const password = e.target.element.value ; 

    fetch('/api/createUser', {
        method: 'POST',
        body: JSON.stringify({name,email,role,password }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data = true){
            return('created sucsses')}
            else if (data=false){
                return('not sucsses ')
            }

        })
}


function editUser(email){
    e.preventDefault();
    const email = email;
    
    fetch('/api/editUser', {
        method: 'POST',
        body: JSON.stringify({name,email,role,password }),
        headers: {
            "Content-Type": "application/json"
        }
    })

}

function deleteUser(email){ 
    fetch('/api/postUserInput', {
        method: 'Delete',
        body: JSON.stringify({email}),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data = true){
            return('Deleted sucsses')}
            else if (data=false){
                return('Not found ')
            }

        })



}














//     return  (

//      <h2>User List</h2>

//         <table>
//             <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Password</th>
//             </tr>
//             <tr>
                
//         messages.map((message, index)=>{
                           
       
//                 <td>Alfreds Futterkiste</td>
//                 <td>Maria Anders</td>
//                 <td>Germany</td>
//                 <td>Germany</td>
//                 <button onClick='edit()'>Edit</button>
//                 <button onClick='delete()'>Delete</button>
//     )
//  }
//             </tr>
//             <tr></tr>

//             </table> 
//      );
//     }








// function App() {


 
//   const [messages, setMessages] = useState([]);

//   //call only on first time the component loads
//   useEffect(() => {
   
     
   

//   }, [])

//   return (
//     <div>
//      <form onSubmit={handleSubmit}>
//        <input type='text' name='input' />
//        <input type='submit' value='OK'  />
//        <button type='submit'>OK</button>
//      </form>
//      {
//        messages.map((message, index)=>{
//          return(<Message key={index} message={message}/>)
//        })
//      }
//     </div>



//   );


//   function handleSubmit(e){
//     e.preventDefault();
//     setMessages([...messages,{text:e.target.elements.input.value, time:new Date()}]);
//     e.target.elements.input.value = '';
//   }
// }

}

export default usersList;
