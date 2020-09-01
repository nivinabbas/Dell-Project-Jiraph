import React from 'react';
import { useHistory } from "react-router-dom";


function Errors(props) {
let errors =props;

return(<div>
    <p>${errors}</p>
    </div>
)


}


export default Errors;