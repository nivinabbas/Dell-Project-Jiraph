import React from 'react';

import "./MainTable.css";




function MainTable(props) {


  const tasks = [{ jiraId: 15, jiraName: "abona", fieldName: "aemna", newValue: 100, updateDate: "15/06/2020" }]
  const headers = ["jiraId", "jiraName", "fieldName", "newValue", "updateDate"]

  return (

    <div className='MainTable'>

      <div className="MainTable__Header"></div>
      {headers.map((header => {
        return (
          <div className="MainTable__Cell">
            {header}
          </div>
        )
      }))}


      <div className="MainTable__Body">
      </div>

      {tasks.map((task) => {
        return (
          <div className="MainTable__Row">

            {headers.map((header => {
              return (
                <div className="MainTable__Body__Cell">
                  {task[header]}
                </div>
              )
            }))}

          </div>
        )
      })}









    </div >

  )

}


export default MainTable;