export const initialTableFilters = [{
        name: "modificationType",
        value: "All"
    },
    {
        name: "modificationField",
        value: ""
    },
    {
        name: "modificationValue",
        value: ""
    },
    {
        name: "status",
        value: "notDone"
    }
];
export const initialPieChartsFilters = [{
        name: "pieChartModificationType",
        value: "",
    },
    {
        name: "pieChartModificationField",
        value: "",
    },
];

export const tasksToBeUpdated = (tasksId, openTasks) => {
    const tasks = [];
    for (let id of tasksId) {
        let found = openTasks.find(task => id === task._id);
        if (found) {
            tasks.push({
                name: found.jiraItem.name,
                status: found.taskItem.isDone ? "Not Done" : "Done"
            });
        }
    }
    return tasks;
}