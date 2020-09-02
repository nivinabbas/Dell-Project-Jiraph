import React from "react";
import "./style.css";
import Select from "react-select";

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
  console.log("tffff", tableFilters);

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
        />
        <Select
          options={modificationFieldOptions}
          className="filterSelect"
          onChange={(filterObj, name) =>
            onSelect(filterObj, "modificationField")
          }
          isDisabled={disableSelect()}
        />
        <Select
          options={modificationFieldValueOptions}
          className="filterSelect"
          onChange={(filter, name) => onSelect(filter, "modificationValue")}
          isDisabled={disableSelect()}
        />
      </div>
      <div className="open-tasks-table">
        <table className="container">
          <thead className="header__table">
            <tr>
              <th scope="col"> # </th> <th scope="col"> Id </th>
              <th scope="col"> Jira Name </th>
              <th scope="col"> Type </th>
              <th scope="col"> Field Name </th>
              <th scope="col"> Old Val </th>
              <th scope="col"> New Val </th>
              <th scope="col"> Done </th>
            </tr>
          </thead>
          <tbody>
            {openTasks.map((task, index) => (
              <tr key={index}>
                <th scope="row"> {++index} </th>
                <td> {task.jiraItem.jiraId} </td>
                <td> {task.jiraItem.jiraName} </td>
                <td> {task.diffItem.type} </td>
                <td> {task.diffItem.updatedField.fieldName} </td>
                <td> {task.diffItem.updatedField.oldValue} </td>
                <td> {task.diffItem.updatedField.newValue} </td>
                <td>
                  <input
                    type="checkbox"
                    onClick={() => onDoneClick(task.jiraItem.jiraId)}
                    key={task._id}
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
