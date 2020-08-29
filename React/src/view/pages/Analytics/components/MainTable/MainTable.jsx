import React from 'react';
import "./MainTable.css";


function MainTable(props) {


  const { changes } = props;
  const tasks = [
    {
      "diffItem": {
        "updateTime": 1568309401000,
        "type": "Update",
        "updatedField": {
          "fieldName": "status",
          "newValue": "In Progress",
          "oldValue": "Done"
        }
      },
      "jiraItem": {
        "priority": "P00",
        "status": "Backlog",
        "jiraType": "Epic",
        "jiraName": "PSI 41: SAR Support for FSCK/Recovery",
        "qaRepresentative": null,
        "functionalTest": "Yes",
        "fixVersion": "PSI_41",
        "jiraId": "TRIES-41773",
        "jiraParentId": "TRIF-842"
      },
      "qcItem": {
        "status": "Backlog",
        "requirementType": "Epic",
        "requirementId": "2164"
      }
    },
    {
      "diffItem": {
        "updateTime": 1568395801000,
        "type": "Update",
        "updatedField": {
          "fieldName": "status",
          "newValue": "In Progress",
          "oldValue": "Done"
        }
      },
      "jiraItem": {
        "priority": "P00",
        "status": "Implementing",
        "jiraType": "Epic",
        "jiraName": "PSI 41: FSCK Support for Late Dedup and VLB Defrag Phase 1 & 2",
        "qaRepresentative": null,
        "functionalTest": "Yes",
        "fixVersion": "PSI_41",
        "jiraId": "TRIES-37201",
        "jiraParentId": "TRIF-842"
      },
      "qcItem": {
        "status": "In Progress",
        "requirementType": "Epic",
        "requirementId": "2011"
      }
    },
    {
      "diffItem": {
        "updateTime": 1568482201000,
        "type": "Update",
        "updatedField": {
          "fieldName": "status",
          "newValue": "In Progress",
          "oldValue": "Done"
        }
      },
      "jiraItem": {
        "priority": "P01",
        "status": "Done",
        "jiraType": "Epic",
        "jiraName": "PSI 39: RAID fsck - Infrastructure update and validation rules expansion",
        "qaRepresentative": null,
        "functionalTest": "Yes",
        "fixVersion": "PSI_39",
        "jiraId": "TRIES-36948",
        "jiraParentId": "TRIF-842"
      },
      "qcItem": {
        "status": "Done",
        "requirementType": "Epic",
        "requirementId": "2008"
      }
    }]
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
      <div className="MainTable__Cell">Fix Version</div>
      <div className="MainTable__Cell">Qc Requirement Id</div>
      <div className="MainTable__Cell">Qc Requirement Type</div>
      <div className="MainTable__Cell">QC Status</div>
     
      {changes && 
        <div className="MainTable__Cell">Updated Time</div>}
        {changes && 
        <div className="MainTable__Cell">Field Name</div>}
        {changes && 
        <div className="MainTable__Cell">Old Value</div>}
        {changes && 
        <div className="MainTable__Cell">New Value</div>}
      




      <div className="MainTable__Body" />

      {tasks.length > 0 && tasks.map((task) => {
        return (
          <div className="MainTable__Row">
            <div className="MainTable__Body__Cell">{task.jiraItem.jiraId}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.jiraName}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.jiraType}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.priority}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.status}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.jiraParentId}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.functionalTest}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.qaRepresentative}</div>
            <div className="MainTable__Body__Cell">{task.jiraItem.fixVersion}</div>
            <div className="MainTable__Body__Cell">{task.qcItem.requirementId}</div>
            <div className="MainTable__Body__Cell">{task.qcItem.requirementType}</div>
            <div className="MainTable__Body__Cell">{task.qcItem.status}</div>
            {changes && 
              <div className="MainTable__Body__Cell">{task.diffItem.updateTime}</div>}
              {changes && 
              <div className="MainTable__Body__Cell">{task.diffItem.updatedField.fieldName}</div>}
              {changes && 
              <div className="MainTable__Body__Cell">{task.diffItem.updatedField.oldValue}</div>}
              {changes && 
              <div className="MainTable__Body__Cell">{task.diffItem.updatedField.newValue}</div>}
          </div>


        )
      })}

    </div >

  )

}


export default MainTable;