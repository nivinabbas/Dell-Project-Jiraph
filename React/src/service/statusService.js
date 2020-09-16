exports.initialTableFilters = [{
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
exports.initialPieChartsFilters = [{
    name: "pieChartModificationType",
    value: "",
},
{
    name: "pieChartModificationField",
    value: "",
},
];

exports.tasksNames = (tasksId, openTasks) => {
    const names = [];
    for (let id of tasksId) {
        let found = openTasks.find(task => id === task._id);
        if (found)
            names.push(found.jiraItem.name);
    }
    return names;
}