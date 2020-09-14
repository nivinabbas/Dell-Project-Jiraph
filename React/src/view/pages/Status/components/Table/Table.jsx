import React, { useRef, useState } from "react";
import Select from "react-select";
import "./style.css";
import TablePagination from "@material-ui/core/TablePagination";

export default function TasksTable({
  openTasks,
  modificationFieldOptions,
  modificationTypeOptions,
  modificationFieldValueOptions,
  onDoneClick,
  onSelect,
  tableFilters,
}) {
  const disableSelect = () => {
    return tableFilters[0].value !== "Update" ? true : false;
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  /* Select inputs refs */
  const modField = useRef("");
  const modValue = useRef("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="open-tasks">
      <div className="open-tasks-title">OPEN TASKS</div>
      <div className="container__filterSelect">
        <h3>Type:</h3>
        <Select
          options={modificationTypeOptions}
          className="filterSelectB"
          onChange={(filter, name) => onSelect(filter, "modificationType")}
          placeholder="All"
          onInputChange={() => {
            modField.current.state.value = "";
            modValue.current.state.value = "";
          }}
        />
        <h3>Field:</h3>
        <Select
          options={modificationFieldOptions}
          className="filterSelectB"
          onChange={(filterObj, name) =>
            onSelect(filterObj, "modificationField")
          }
          isDisabled={disableSelect()}
          placeholder="Field"
          ref={modField}
          onInputChange={() => (modValue.current.state.value = "")}
        />
        <h3>Value:</h3>
        <Select
          options={modificationFieldValueOptions}
          className="filterSelectB"
          onChange={(filter, name) => onSelect(filter, "modificationValue")}
          isDisabled={disableSelect()}
          placeholder="Value"
          ref={modValue}
        />
        <button>Update</button>
      </div>
      <div className="open-tasks-table">
        <table className="container">
          <thead className="header__table">
            <tr>
              <th scope="col"> # </th> <th scope="col"> Id </th>
              <th scope="col"> Jira Name </th> <th scope="col"> Type </th>
              <th scope="col"> Field Name </th> <th scope="col"> Old Val </th>
              <th scope="col"> New Val </th> <th scope="col"> Done </th>
            </tr>
          </thead>
          <tbody className="body">
            {openTasks.map((task, index) => (
              <tr key={index}>
                <th scope="row"> {++index} </th>
                <td> {task.jiraItem.id} </td>
                <td> {task.jiraItem.name} </td>
                <td> {task.diffItem.type} </td>
                <td>
                  {task.diffItem.updatedField &&
                    task.diffItem.updatedField.fieldName}
                </td>
                <td>
                  {task.diffItem.updatedField &&
                    task.diffItem.updatedField.oldValue}
                </td>
                <td>
                  {task.diffItem.updatedField &&
                    task.diffItem.updatedField.newValue}
                </td>
                <td>
                  <input
                    type="checkbox"
                    onClick={() => onDoneClick(task._id, task.taskItem.isDone)}
                    key={task._id}
                    checked={task.taskItem.isDone}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={10}
          rowsPerPage={1}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
