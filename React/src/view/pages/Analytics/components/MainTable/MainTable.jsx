import React from 'react';
import styled from 'styled-components'
import "./MainTable.css";
import { useTable,
         useResizeColumns,
         useFlexLayout,
         useRowSelect, 
       } from 'react-table';
import Select from 'react-select'
import ReactTable from "react-table"; 

const Styles = styled.div`
  padding: 1rem;
  ${'' /* These styles are suggested for the table fill all available space in its containing element */}
  display: block;
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: auto;

  .checkBoxPannel{
    display:flex;
    margin:0;
  }
  .table {
    border-spacing: 0;
    border: 1px solid black;
    margin: 0;
    

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: hidden;
      height: 250px;
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid black;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        right: 0;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`
const data=[{}]

const columns = [
  {  Header: 'JiraId ',  accessor: 'jiraId'},
  {  Header: 'Jira Name',  accessor: 'jiraName '},
  {  Header: 'Jira Type ',  accessor: 'jiraType '},
  {  Header: 'Jira Priority',  accessor: 'jiraPriority'},
  {  Header: 'Jira Item Status ',  accessor: 'jiraItemStatus'},
  {  Header: 'jira Parent Id',  accessor: 'jiraParentId'},
  {  Header: 'Functional Test ',  accessor: 'functionalTest'},
  {  Header: 'Qa Representative',  accessor: 'qaRepresentative'},
  {  Header: 'Updated Time',  accessor: 'updatedTime'},
  {  Header: 'Field Name',  accessor: 'fieldName'},
  {  Header: 'Old Value',  accessor: 'oldValue'},
  {  Header: 'New Value',  accessor: 'newValue'},
]  

const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)


function MainTable() {
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow , allColumns, getToggleHideAllColumnsProps,
    state } = useTable(
    {
      columns,
      data,
      
    },
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
  )
  return (
    <Styles>
       <div className="checkBoxPannel">
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
           Toggle All
        </div>
        {allColumns.map(column => (
          <div key={column.id} >
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map(headerGroup => (
          <div
            {...headerGroup.getHeaderGroupProps({
              // style: { paddingRight: '15px' },
            })}
            className="tr"
          >
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps(headerProps)} className="th">
                {column.render('Header')}
                {/* Use column.getResizerProps to hook up the events correctly */}
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="tbody">
        {rows.map(row => {
          prepareRow(row)
          return (
            <div {...row.getRowProps()} className="tr">
              {row.cells.map(cell => {
                return (
                  <div {...cell.getCellProps(cellProps)} className="td">
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
    </Styles>
  )
}

   
    //   <div className='MainTable'>
    //   <div className="MainTable__Header"></div>
    //   <div className="MainTable__Cell">Jira ID</div>
    //   <div className="MainTable__Cell">Jira Name</div>
    //   <div className="MainTable__Cell">Jira Type</div>
    //   <div className="MainTable__Cell">Jira Priority</div>
    //   <div className="MainTable__Cell">Jira Item Status</div>
    //   <div className="MainTable__Cell">jira Parent Id</div>
    //   <div className="MainTable__Cell">Functional Test</div>
    //   <div className="MainTable__Cell">Qa Representative</div>
    //   {/* <div className="MainTable__Cell">Fix Version</div> */}
    //   {/* <div className="MainTable__Cell">Qc Requirement Id</div>
    //   <div className="MainTable__Cell">Qc Requirement Type</div>
    //   <div className="MainTable__Cell">QC Status</div> */}

    //   {changes &&  <div className="MainTable__Cell">Updated Time</div>}
    //   {changes &&  <div className="MainTable__Cell">Field Name</div>}
    //   {changes &&  <div className="MainTable__Cell">Old Value</div>}
    //   {changes &&  <div className="MainTable__Cell">New Value</div>}
      




    //   <div className="MainTable__Body" />

    //   {tasks && tasks.map((task,index) => {
    //     return (
          
    //       <div key={index} className="MainTable__Row">

    //         <div className="MainTable__Body__Cell">{task.jiraItem.jiraId}</div>
    //         <div className="MainTable__Body__Cell">{task.jiraItem.jiraName}</div>
    //         <div className="MainTable__Body__Cell">{task.jiraItem.jiraType}</div>
    //         <div className="MainTable__Body__Cell">{task.jiraItem.priority}</div>
    //         <div className="MainTable__Body__Cell">{task.jiraItem.status}</div>
    //         <div className="MainTable__Body__Cell">{task.jiraItem.jiraParentId}</div>
    //         <div className="MainTable__Body__Cell">{task.jiraItem.functionalTest}</div>
    //         <div className="MainTable__Body__Cell">{task.jiraItem.qaRepresentative}</div>
    //         {/* <div className="MainTable__Body__Cell">{task.jiraItem.fixVersion}</div> */}
    //         {/* <div className="MainTable__Body__Cell">{task.qcItem.requirementId}</div>
    //         <div className="MainTable__Body__Cell">{task.qcItem.requirementType}</div>
    //         <div className="MainTable__Body__Cell">{task.qcItem.status}</div> */}

    //         {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updateTime}</div>}
    //         {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updatedField.fieldName}</div>}
    //         {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updatedField.oldValue}</div>}
    //         {changes &&  <div className="MainTable__Body__Cell">{task.diffItem.updatedField.newValue}</div>}

    //       </div>


    //     )
    //   })}

    // </div >





export default MainTable;