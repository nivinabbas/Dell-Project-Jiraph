import React from 'react';

import "./MainTable.css";




function MainTable(props) {
  

  const {tasks}=props;

    
  return (
      
    <div className='MainTable'>
      
      {/* <div className="ModificationByFieldTable__Caption">

        Modification By Field
        </div > */}
             <div className="MainTable__Header"></div>
      <div className="MainTable__Cell">
        JiraID
</div>
      <div className="MainTable__Cell">
        Jira Name
</div>
      <div className="MainTable__Cell">
        Field Name
</div>
      <div className="MainTable__Cell">
        Old Value
</div>
      <div className="MainTable__Cell">
        New Value
</div>
      <div className="MainTable__Cell">
        Modified Date
</div>

      <div className="MainTable__Body">
      </div>
      
      {tasks && tasks.map((task) => { 
        return (
        <div className="MainTable__Row">
        
          <div className="MainTable__Body__Cell">
            {task.jiraItem.jiraId}
</div>

           <div className="MainTable__Body__Cell">
          {task.jiraItem.jiraName}
          </div>
          <div className="MainTable__Body__Cell">
          {task.diffItem.updatedFields[0].fieldName}
</div>
          <div className="MainTable__Body__Cell">
          {task.diffItem.updatedFields[0].oldValue}
</div>


          <div className="MainTable__Body__Cell">
          {task.diffItem.updatedFields[0].newValue}
</div>
          <div className="MainTable__Body__Cell">
          {new Date(task.diffItem.updateTime).getDate()}/{new Date(task.diffItem.updateTime).getMonth()+1}/{new Date(task.diffItem.updateTime).getFullYear()}
</div> 
        
</div>
        
)

      })}
      
   




    </div >
    
  )

}


export default MainTable;