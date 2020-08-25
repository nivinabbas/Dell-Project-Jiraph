import React from 'react';
import MultiSelect from 'react-multi-select-component'


function Select(props) {

    const { options } = props;



    return (
        
            <select>
                {options && options.map((option,index) => {
                    return (
                        <option index={index} value={option.name}>{option.name}</option>
            
        )
                })}

            </select>
        

    )



}




export default Select;