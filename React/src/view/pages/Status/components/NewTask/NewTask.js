import React from "react";
import "./NewTask.css";

const NewTask = () => {

    return (
        <div className="NewTaskContainer">
            <h1>new task</h1>
            <form >
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default NewTask;