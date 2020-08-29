import React from "react";
import "./style.css";

export default function TasksTable({ openTasks, onDoneClick }) {
  return (
    <div className="open-tasks">
      <div className="open-tasks-title">
        <h3>Open Tasks</h3>
      </div>
      <div className="open-tasks-table">
        <table className="table">
          <thead className="thead-dark">
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
                  <i onClick={() => onDoneClick(task.jiraItem.jiraId)}>
                    &#9989;
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
