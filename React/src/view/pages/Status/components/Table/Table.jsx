import React, { useState } from "react";
import Select from "react-select";
import "./style.css";
import TablePagination from "@material-ui/core/TablePagination";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
const getPaginatedTasks = (tasks = [], pageNumber = 0, rowsCount = 25) => {
  const start = (pageNumber + 1) * rowsCount - rowsCount;
  return tasks.slice(start, start + rowsCount);
};

export default function TasksTable({
  openTasks,
  modificationFieldOptions,
  modificationTypeOptions,
  modificationFieldValueOptions,
  statusOptions,
  onDoneClick,
  onSelect,
  tableFilters,
  onUpdateClick,
  numOfTasksToBeUpdeated,
}) {
  const disableSelect = () => {
    return tableFilters[0].value !== "Update" ? true : false;
  };

  const [pageNumber, setPageNumber] = useState(0);
  const [rowsCount, setRowsCount] = useState(25);
  const [paginatedTasks, setPaginatedTasks] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
    setPaginatedTasks(getPaginatedTasks(openTasks, newPage, rowsCount));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsCount(parseInt(event.target.value, 10));
    setPageNumber(0);
    setPaginatedTasks(getPaginatedTasks(openTasks, 0, event.target.value));
  };

  useEffect(() => {
    setPaginatedTasks(getPaginatedTasks(openTasks));
  }, [openTasks]);

  return (
    <div className="open-tasks">
      <div className="open-tasks-title">OPEN TASKS :</div>
      <div className="container__filterSelect">
        <div>
          <h3 className="headers-h3">Type:</h3>
          <Select
            options={modificationTypeOptions}
            className="filterSelectB__3"
            onChange={(filter, name) => onSelect(filter, "modificationType")}
            placeholder={tableFilters[0].value}
            value={tableFilters[0].value}
          />
        </div>
        <div>
          <h3 className="headers-h3">Field:</h3>
          <Select
            options={modificationFieldOptions}
            className="filterSelectB__3"
            onChange={(filterObj, name) =>
              onSelect(filterObj, "modificationField")
            }
            isDisabled={disableSelect()}
            placeholder={tableFilters[1].value}
            value={tableFilters[1].value}
          />
        </div>
        <div>
          <h3 className="headers-h3">Value:</h3>
          <Select
            options={modificationFieldValueOptions}
            className="filterSelectB__3"
            onChange={(filter, name) => onSelect(filter, "modificationValue")}
            isDisabled={disableSelect()}
            placeholder={tableFilters[2].value}
            value={tableFilters[2].value}
          />
        </div>
        <div>
          <h3 className="headers-h3">Done/Not Done:</h3>
          <Select
            options={statusOptions}
            className="filterSelectB__3"
            onChange={(filter, name) => onSelect(filter, "status")}
            placeholder={tableFilters[3].value}
            value={tableFilters[3].value}
          />
        </div>
        <button
          className="update__Btn"
          onClick={() => onUpdateClick()}
          disabled={numOfTasksToBeUpdeated === 0}
        >
          Update Task/s  <span>{numOfTasksToBeUpdeated}</span>
        </button>
      </div>
      <div className="open-tasks-table">
        <table className="container">
          <thead className="header__table">
            <tr>
              <th className="tabel__first__row__item" scope="col"> # </th> <th scope="col"> Id </th>
              <th className="tabel__first__row__item"  scope="col"> Jira Name </th> <th scope="col"> Type </th>
              <th className="tabel__first__row__item"  scope="col"> Field Name </th> <th scope="col"> Old Val </th>
              <th className="tabel__first__row__item"  scope="col"> New Val </th> <th scope="col"> Done </th>
            </tr>
          </thead>
          <tbody className="body">
            {paginatedTasks.map((task, index) => (
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
                    defaultChecked={task.taskItem.isDone}
                    onChange={() => {}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <TablePagination
            rowsPerPageOptions={[50, 100]}
            component="div"
            count={openTasks === undefined ? 0 : openTasks.length}
            rowsPerPage={rowsCount}
            page={pageNumber}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
