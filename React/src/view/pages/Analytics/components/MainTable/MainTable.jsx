import React from 'react';

import "./MainTable.css";




function MainTable(props) {


  const { tasks } = props

  return (

    <div className='MainTable'>

      <div className="MainTable__Header"></div>
      <div className="MainTable__Cell">Jira ID</div>
        
       
      <div className="MainTable__Cell">Jira Name</div>
        
        
      <div className="MainTable__Cell">Field Name</div>
        
        
      <div className="MainTable__Cell">New Value</div>
        
        
      <div className="MainTable__Cell">Updated Time</div>
        
    
      <div className="MainTable__Body" />

      {tasks.length > 0 && tasks.map((task) => {
        return (
          <div className="MainTable__Row">
            <div className="MainTable__Row">

              <div className="MainTable__Body__Cell">
                {task.jiraItem.jiraId}
              </div>

              <div className="MainTable__Body__Cell">
                {task.jiraItem.jiraName}
              </div>
              <div className="MainTable__Body__Cell">
                {task.diffItem.updatedFields.fieldName}
              </div>
              <div className="MainTable__Body__Cell">
                {task.diffItem.updatedField.oldValue}
              </div>


              <div className="MainTable__Body__Cell">
                {task.diffItem.updatedFields.newValue}
              </div>
              <div className="MainTable__Body__Cell">
                {task.diffItem.updateTime}
              </div>

            </div>




          </div>

        )
      })}









    </div >

  )

}


export default MainTable;