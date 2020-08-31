import React from "react";
import "./style.css";
import Select from "react-select";

const optionSprint = [
  { value: "all", label: "All" },
  { value: "create", label: "Create" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

const optionFunctional = [
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "qaRepresentitive", label: "QA representitive" },
];

const optionValue = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

export default function TasksTable({
  openTasks,
  onDoneClick,
  onSelect,
  onTableFilterClick,
}) {
  return (
    <div className="open-tasks">
      <div className="open-tasks-title">
        <h3>Open Tasks</h3>
      </div>
      <div className="container__filterSelect">
        <Select
          options={optionFunctional}
          className="filterSelect"
          onChange={(filter, action) => onSelect(filter, action)}
          name="modificationType"
        />
        <Select
          options={optionSprint}
          className="filterSelect"
          onChange={(filter, action) => onSelect(filter, action)}
          name="modificationField"
        />
        <Select
          options={optionValue}
          className="filterSelect"
          onChange={(filter, action) => onSelect(filter, action)}
          name="modificationValue"
        />
        <input
          type="submit"
          className="submitButton"
          onClick={onTableFilterClick}
        />
      </div>
      <div className="open-tasks-table">
        <table className="container">
          <thead className="header__table">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Jira Name</th>
              <th scope="col">Field Name</th>
              <th scope="col">Old Val</th>
              <th scope="col">New Val</th>
              <th scope="col">Done</th>
            </tr>
          </thead>
          <tbody>
            {openTasks.map((task, index) => (
              <tr key={index}>
                <th scope="row">{++index}</th>
                <td>{task.jiraItem.jiraId}</td>
                <td>{task.jiraItem.jiraName}</td>
                <td>{task.diffItem.updatedField.fieldName}</td>
                <td>{task.diffItem.updatedField.oldValue}</td>
                <td>{task.diffItem.updatedField.newValue}</td>
                <td>
                  <input
                    type="checkbox"
                    onClick={() => onDoneClick(task.jiraItem.jiraId)}
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
