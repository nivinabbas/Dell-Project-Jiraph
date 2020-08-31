import React from "react";
import "./style.css";
import Select from "react-select";

const optionSprint = [
  { value: "All", label: "All" },
  { value: "Create", label: "Create" },
  { value: "Update", label: "Update" },
  { value: "Delete", label: "Delete" },
];

const optionFunctional = [
  { value: "Status", label: "Status" },
  { value: "Priority", label: "Priority" },
  { value: "qaRepresentitive", label: "QA representitive" },
];

const optionValue = [
  { value: "True", label: "true" },
  { value: "False", label: "false" },
];
export default function TasksTable({ openTasks, onDoneClick }) {
  return (
    <div className="open-tasks">
      <div className="open-tasks-title">
        <h3>Open Tasks</h3>
      </div>
      <div className="container__filterSelect">
        <Select options={optionFunctional} className="filterSelect" />
        <Select options={optionSprint} className="filterSelect" />
        <Select options={optionValue} className="filterSelect" />
        <input type="submit" className="submitButton" />
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
