import React from "react";
import "./style.css";
import Select from "react-select";
import { isEmpty } from "../../../../../service/utils";

export default function TasksTable({
  openTasks,
  selectOptions,
  modificationFieldOptions,
  modificationTypeOptions,
  modificationFieldValueOptions,
  onDoneClick,
  onSelect,
  onTableFilterClick,
  tableFilters,
}) {
  const disableSelect = () => {
    return tableFilters[0].value !== "Update" ? true : false;
  };

  return (
    <div className="open-tasks">
      <div className="open-tasks-title">
        <h3> Open Tasks </h3>
      </div>
      <div className="container__filterSelect">
        <Select
          options={modificationTypeOptions}
          className="filterSelect"
          onChange={(filter, name) => onSelect(filter, "modificationType")}
          placeholder="Type"
        />
        <Select
          options={modificationFieldOptions}
          className="filterSelect"
          onChange={(filterObj, name) =>
            onSelect(filterObj, "modificationField")
          }
          isDisabled={disableSelect()}
          placeholder="Field"
        />
        <Select
          options={modificationFieldValueOptions}
          className="filterSelect"
          onChange={(filter, name) => onSelect(filter, "modificationValue")}
          isDisabled={disableSelect()}
          placeholder="Value"
        />
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
          <tbody>
            {openTasks.map((task, index) => (
              <tr key={index}>
                <th scope="row"> {++index} </th>
                <td> {task.jiraItem.jiraId} </td>
                <td> {task.jiraItem.jiraName} </td>
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
                    onClick={() => onDoneClick(task.jiraItem.jiraId)}
                    key={task._id}
                    checked={task.taskItem.isDone}
                    disabled={task.taskItem.isDone}
                    onChange={(e) => {}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
