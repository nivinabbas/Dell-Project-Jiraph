import React from 'react';
import "./MainTable.css";


function MainTable(props) {


  const { changes } = props;
  const {tasks} = props
  return (

    <div className='MainTable'>
      <div className="MainTable__Header"></div>
      <div className="MainTable__Cell">Jira ID</div>
      <div className="MainTable__Cell">Jira Name</div>
      <div className="MainTable__Cell">Jira Type</div>
      <div className="MainTable__Cell">Jira Priority</div>
      <div className="MainTable__Cell">Jira Item Status</div>
      <div className="MainTable__Cell">jira Parent Id</div>
      <div className="MainTable__Cell">Functional Test</div>
      <div className="MainTable__Cell">Qa Representative</div>
      {/* <div className="MainTable__Cell">Fix Version</div> */}
      {/* <div className="MainTable__Cell">Qc Requirement Id</div>
      <div className="MainTable__Cell">Qc Requirement Type</div>
      <div className="MainTable__Cell">QC Status</div> */}

      {changes &&  <div className="MainTable__Cell">Updated Time</div>}
      {changes &&  <div className="MainTable__Cell">Field Name</div>}
      {changes &&  <div className="MainTable__Cell">Old Value</div>}
      {changes &&  <div className="MainTable__Cell">New Value</div>}
      




      <div className="MainTable__Body" />

      {tasks && tasks.map((task,index) => {
        return (
          
          <div key={index} className="MainTable__Row">

            <div className="MainTable__Body__Cell">{task.jiraItem.jiraId}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.jiraName}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.jiraType}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.priority}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.status}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.jiraParentId}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.functionalTest}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.qaRepresentative}</div>
            {/* <div className="MainTable__Body__Cell">{task.jiraItem.fixVersion}</div> */}
            {/* <div className="MainTable__Body__Cell">{task.qcItem.requirementId}</div>
            <div className="MainTable__Body__Cell">{task.qcItem.requirementType}</div>
            <div className="MainTable__Body__Cell">{task.qcItem.status}</div> */}

            {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updateTime}</div>}
            {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updatedField.fieldName}</div>}
            {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updatedField.oldValue}</div>}
            {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updatedField.newValue}</div>}

          </div>


        )
      })}

    </div >

  )

}


export default MainTable;