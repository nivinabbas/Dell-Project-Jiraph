import React from 'react';
import "./MainTable.css";
import { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import MaterialTable from 'material-table';


function MainTable(props) {
  const { tasks } = props

  const tableIcons = {

    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  };
  const columns = [
    {
      title: 'jiraId', field: 'jiraId',
      cellStyle: {
        minWidth: 150,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',
       
      },
    },
    {
      title: 'jira Name', field: 'jiraName',
      cellStyle: {
        minWidth: 300,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',
      },
    },
    {
      title: 'jira Type', field: 'jiraType',
      cellStyle: {
        minWidth: 100,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',
      },
    },
    {
      title: 'Jira Priority', field: 'jiraPriority',
      cellStyle: {
        minWidth: 150,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'Jira Item Status', field: 'JiraItemStatus',
      cellStyle: {
        minWidth: 150,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'jira Parent Id', field: 'jiraParentId',
      cellStyle: {
        minWidth: 200,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'Functional Test', field: 'functionalTest',
      cellStyle: {
        minWidth: 150,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'Qa Representative', field: 'qaRepresentative',
      cellStyle: {
        minWidth: 200,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',
        

      },
    },
    {
      title: 'Fix Version', field: 'fixVersion',
      cellStyle: {
        minWidth: 150,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'Qc Requirement Id', field: 'qcRequirementId',
      cellStyle: {
        minWidth: 150,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'Qc Requirement Type', field: 'qcRequirementType',
      cellStyle: {
        minWidth: 200,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'QC Status', field: 'qcStatus',
      cellStyle: {
        minWidth: 150,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'Updated Time', field: 'updatedTime',
      cellStyle: {
        minWidth: 200,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'Modify type ', field: 'modifyType',
      cellStyle: {
        height: 'fit-content',
        minWidth: 200,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',
      },
    },
    {
      title: 'Field Name', field: 'fieldName',
      cellStyle: {
        height: 'fit-content',
        minWidth: 200,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',
      },
    },
    {
      title: 'Old Value', field: 'oldValue',
      cellStyle: {
        minWidth: 100,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
    {
      title: 'New Value', field: 'newValue',
      cellStyle: {
        minWidth: 100,
        border: '1px solid steelBlue',
        backgroundColor: 'whiteSmoke',
        color: 'black',

      },
    },
  ]

  let data = []
  tasks.map((task) => {
    return data = [...data,
    {
      jiraId: task.jiraItem.id,
      jiraName: task.jiraItem.name,
      jiraType: task.jiraItem.type,
      jiraPriority: task.jiraItem.priority,
      JiraItemStatus: task.jiraItem.status,
      jiraParentId: task.jiraItem.parentId,
      functionalTest: task.jiraItem.functionalTest,
      qaRepresentative: task.jiraItem.qaRepresentative,
      fixVersion: task.jiraItem.fixVersion,
      qcRequirementId: task.qcItem.requirementId,
      qcRequirementType: task.qcItem.requirementType,
      qcStatus: task.qcItem.status,
      updatedTime: task.diffItem.updatedTime,
      modifyType:task.diffItem.type,
      fieldName: task.diffItem.updatedField.fieldName,
      oldValue: task.diffItem.updatedField.oldValue,
      newValue: task.diffItem.updatedField.newValue,
    }
    ]
  })
  


  return (
  
        <MaterialTable
          title='Analysis'
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            
            headerStyle: {
              backgroundColor: '#00447C',
              color: '#FFF',
              border: '1px solid black',
              borderBottom:'none',
              padding: 3,
              textAlign: 'center',
            },

          }}

        />

  );
}
   
   



export default MainTable;