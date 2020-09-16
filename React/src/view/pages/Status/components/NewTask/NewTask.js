import React, { useState } from "react";
import "./NewTask.css";

import {
    BrowserRouter as Router,
    useHistory,
} from "react-router-dom";



const NewTask = () => {

    let history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault();
        let { jiraName, jiraType, jiraField, oldValue, newValue } = e.target.elements;
        jiraName = jiraName.value;
        jiraType = jiraType.value;
        jiraField = jiraField.value;
        oldValue = oldValue.value;
        newValue = newValue.value;

        console.log(jiraName, jiraType, jiraField, oldValue, newValue)
        const userId = null;
        fetch("/api/status/addNewTask", {
            method: "POST",
            body: JSON.stringify({ userId, jiraName, jiraType, jiraField, oldValue, newValue }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                let { success, error, info } = res;
                if (success) {
                    history.push("/status");
                } else {
                    alert(error);
                }
            });

        e.target.reset();
        history.push("/status");

    }

    return (
        <div className="NewTaskContainer">
            <form className="NewTaskContainer__labels" onSubmit={handleSubmit}>
                <label>Jira Name:</label>
                <input type='text' name='jiraName' placeholder="Jira Name" required />
                <label>Jira Type:</label>
                <input type='text' name='jiraType' placeholder="Jira Type" required />
                <label>Jira Field:</label>
                <input type='text' name='jiraField' placeholder="Jira Field" required />
                <label>Old Value:</label>
                <input type='text' name='oldValue' placeholder="Old Value" required />
                <label>New Value:</label>
                <input password='text' name='newValue' placeholder="newValue" required />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
};

export default NewTask;