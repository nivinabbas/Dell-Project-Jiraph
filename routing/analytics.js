const express = require("express");

const router = express.Router();
const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const TaskModel = require('../schemas/TaskSchema');

//app.get/post/put/delete => router.get/post/put/delete


//Weekly Label Function===> 
function weeklyLabel(startDate, endDate, tasks) {

    //function to get certain date after adding amount of days
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    //function to get number of days between 2 date range
    const diffTime = Math.abs(endDate - startDate);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let weeklyStartDate = startDate;//variable for starting date of each week
    let weeklyEndDate = addDays(weeklyStartDate, 6)//variable for ending date of each week
    let currentWeek = 0;//counter for weeks
    let arrayForWeeks = [];//array that will contain the UiObj
    while (diffDays > 6) {
        arrayForWeeks.push(
            { _id: `${weeklyStartDate.getDate()}/${weeklyStartDate.getMonth() + 1}/${weeklyStartDate.getFullYear()} - ${weeklyEndDate.getDate()}/${weeklyEndDate.getMonth() + 1}/${weeklyEndDate.getFullYear()}`, arr: [] })
        diffDays = diffDays - 7;
        weeklyStartDate = addDays(weeklyEndDate, 1);
        weeklyEndDate = addDays(weeklyStartDate, 6);
    }
    if (diffDays > 0) {//add the days as a range
        weeklyEndDate = addDays(weeklyStartDate, diffDays - 1);
        arrayForWeeks.push(
            { _id: `${weeklyStartDate.getDate()}/${weeklyStartDate.getMonth() + 1}/${weeklyStartDate.getFullYear()} - ${weeklyEndDate.getDate()}/${weeklyEndDate.getMonth() + 1}/${weeklyEndDate.getFullYear()}`, arr: [] })

    }
    weeklyEndDate = addDays(startDate, 6);

    for (i = 0; i < tasks.length; i++) {
        if (new Date(tasks[i]._id) <= weeklyEndDate) {
            arrayForWeeks[currentWeek].arr = arrayForWeeks[currentWeek].arr.concat(tasks[i].arr)
        }
        else {
            while (weeklyEndDate < (new Date(tasks[i]._id))) {
                weeklyEndDate = addDays(weeklyEndDate, 7);
                currentWeek++;
            }
            arrayForWeeks[currentWeek].arr = arrayForWeeks[currentWeek].arr.concat(tasks[i].arr)

        }
    }

    //function to remove all the weeks that contains 0 tasks
    let filtered = arrayForWeeks.filter(function (el) { return el.arr.length > 0; });
    let result = [];
    filtered.map((element => {
        let result2 = { _id: element._id, arr: [] };
        element.arr.map((task => {
            let obj = result2.arr.find(obj => obj.value === task.value);
            if (obj != undefined) {
                obj.tasks = obj.tasks.concat(task.tasks);
                obj.size = obj.tasks.length;
            }
            else {
                result2.arr.push({ value: task.value, tasks: task.tasks, size: task.tasks.length })
            }
        }))
        result.push(result2);
    }))
    result.map((week => {
        week.arr.sort((a, b) => a.value > b.value ? -1 : 1)
    }))
    return result;
}


//Date format function
function formatDate(date) {
    month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

router.post('/modificationByField', async (req, res) => {
    let tasks = []
    const { serverFilters } = req.body
    let { fieldName, values, qaRepresentative, startDate, endDate, label } = serverFilters;
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    let dateFormat = '';
    if (label[0] == 'yearly') {
        dateFormat = "%Y"
    }
    else if (label[0] == 'monthly') {
        dateFormat = "%Y-%m"
    }
    else {
        dateFormat = "%Y-%m-%d"
    }


    //here we build the match expression according to the user's filters.

    let filtersArray = [{ "diffItem.type": "Update" }, { "diffItem.updatedTime": { $gte: startDate } }, { "diffItem.updatedTime": { $lte: endDate } }]
    let matchFilterValue = {
        "$and": []
    }
    let aggregateArray = [
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: dateFormat, date: "$diffItem.updatedTime" } },
                    fieldName: "$diffItem.updatedField.fieldName"

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {
                _id: "$_id.date",
                arr: { $push: { value: "$_id.fieldName", tasks: "$tasks", size: { $size: "$tasks" } } },

            }

        },
        { $sort: { _id: 1 } }
    ]
    if (fieldName.length != 0) {
        filtersArray.push({ "diffItem.updatedField.fieldName": fieldName[0] })
        aggregateArray.splice(1, 1,
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: dateFormat, date: "$diffItem.updatedTime" } },
                        fieldName: "$diffItem.updatedField.newValue"
                    },
                    tasks: { $push: "$$ROOT" },
                }
            });
    }
    if (qaRepresentative.length != 0) {
        filtersArray.push({ "jiraItem.qaRepresentative": qaRepresentative[0] })
    }
    if (values.length != 0) {
        let valuesArray = []
        values.map((item, index) => {
            valuesArray.push({ "diffItem.updatedField.newValue": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }

    matchFilterValue["$and"] = filtersArray
    tasks = await TaskModel.aggregate(aggregateArray)

    if (label[0] === "weekly") {
        tasks = weeklyLabel(startDate, endDate, tasks);
    }

    let maxLength = 0;
    let sumLength = 0;
    if (tasks.length > 0) {
        tasks.map((item, index) => {
            let myArray = item.arr;
            myArray.forEach(element => {
                element.tasks.map((task => {
                    task.diffItem.updatedTime = formatDate(task.diffItem.updatedTime)
                }))

                if (element.size > maxLength) {
                    maxLength = element.size
                }
                sumLength += element.size
            })
            item.maxLength = maxLength
            item.sumLength = sumLength
            //maxLength=0;
            sumLength = 0;
        })
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.fieldName > b.fieldName) ? 1 : -1);
            if (item.maxLength < maxLength) {
                item.maxLength = maxLength
            }
        })
    }
    res.send(tasks)
})


router.post('/modificationByFieldFilters', async (req, res) => {
    let tasks = []
    let { fieldName, startDate, endDate } = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    if (fieldName.length == 0) { // runs to bring all the fieldNames and QA when reloading
        tasks = await TaskModel.aggregate([
            {
                $match: {
                    "diffItem.updatedTime": { $gte: startDate, $lte: endDate }, "diffItem.type": "Update"
                }
            },
            {
                $group: {
                    _id: null,
                    labels: { $addToSet: { "label": "$diffItem.updatedField.fieldName", "value": "$diffItem.updatedField.fieldName" } },
                    QA: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
                },
            }
        ])
        tasks.map((item, index) => {
            item.labels.sort((a, b) => (a.label > b.label) ? 1 : -1);
            item.QA.sort((a, b) => (a.label > b.label) ? 1 : -1);
        })
    }
    else { // bring all the Values for the fieldName
        const name = fieldName[0];
        tasks = await TaskModel.aggregate([
            {
                $match: { "diffItem.updatedField.fieldName": name, "diffItem.type": "Update" }
            },
            {
                $group: {
                    _id: null,
                    Values: { $addToSet: { "label": "$diffItem.updatedField.newValue", "value": "$diffItem.updatedField.newValue" } },
                }
            },
        ])
        tasks.map((item, index) => {
            item.Values.sort((a, b) => (a.label > b.label) ? 1 : -1);
        })
    }
    res.send(tasks)
})


router.post('/deletedJiraTickets', async (req, res) => {
    let tasks = []
    const { serverFilters } = req.body
    let { priority, qaRepresentative, functionalTest, startDate, endDate, label } = serverFilters;
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    let dateFormat = '';
    if (label[0] == 'yearly') {
        dateFormat = "%Y"
    }
    else if (label[0] == 'monthly') {
        dateFormat = "%Y-%m"
    }
    else {
        dateFormat = "%Y-%m-%d"
    }


    //here we build the match expression according to the user's filters.

    let filtersArray = [{ "diffItem.type": "Delete" }, { "diffItem.updatedTime": { $gte: startDate } }, { "diffItem.updatedTime": { $lte: endDate } }]  // add the startdate and enddate and label here
    let matchFilterValue = {
        "$and": []
    }
    if (priority.length != 0) {
        let valuesArray = []
        priority.map((item, index) => {
            valuesArray.push({ "jiraItem.priority": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }
    if (qaRepresentative.length != 0) {
        let valuesArray = []
        qaRepresentative.map((item, index) => {
            valuesArray.push({ "jiraItem.qaRepresentative": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }
    if (functionalTest.length != 0) {
        let valuesArray = []
        functionalTest.map((item, index) => {
            valuesArray.push({ "jiraItem.functionalTest": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }

    matchFilterValue["$and"] = filtersArray

    tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: dateFormat, date: "$diffItem.updatedTime" } },
                    priority: "$jiraItem.priority"

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {
                _id: "$_id.date",
                arr: { $push: { value: "$_id.priority", tasks: "$tasks", size: { $size: "$tasks" } } },

            }

        },
        { $sort: { _id: 1 } }
    ])
    if (label[0] === "weekly") {
        tasks = weeklyLabel(startDate, endDate, tasks);
    }
    let maxLength = 0;
    let sumLength = 0;
    if (tasks.length > 0) {
        tasks.map((item, index) => {
            let myArray = item.arr;
            myArray.forEach(element => {
                element.tasks.map((task => {
                    task.diffItem.updatedTime = formatDate(task.diffItem.updatedTime)
                }))
                if (element.size > maxLength) {
                    maxLength = element.size
                }
                sumLength += element.size
            })
            item.maxLength = maxLength
            item.sumLength = sumLength
            //maxLength=0;
            sumLength = 0;
        })
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
            if (item.maxLength < maxLength) {
                item.maxLength = maxLength
            }
        })
    }
    res.send(tasks)
})


router.post('/deletedJiraTicketsFilters', async (req, res) => {
    let tasks = []
    let { startDate, endDate } = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    //if (fieldName.length == 0) { // runs to bring all the fieldNames and QA when reloading
    tasks = await TaskModel.aggregate([
        {
            $match: { "diffItem.updatedTime": { $gte: startDate, $lte: endDate }, "diffItem.type": "Delete" }
        },
        {
            $group: {
                _id: null,
                priorities: { $addToSet: { "label": "$jiraItem.priority", "value": "$jiraItem.priority" } },
                QA: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
            },
        }
    ])
    tasks.map((item, index) => {
        item.priorities.sort((a, b) => (a.label > b.label) ? 1 : -1);
        item.QA.sort((a, b) => (a.label > b.label) ? 1 : -1);
    })
    res.send(tasks)

})

router.post('/changesByParentIdFilters', async (req, res) => {
    let tasks = []
    const { serverFilters } = req.body
    let { fixVersion, startDate, endDate } = serverFilters;
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    if (fixVersion.length == 0) { // runs to bring all the fixVersions
        tasks = await TaskModel.aggregate([
            {
                $group: {
                    _id: null,
                    fixVersions: { $addToSet: { "label": "$jiraItem.fixVersion", "value": "$jiraItem.fixVersion" } },
                },
            }
        ])
        tasks.map((item, index) => {
            item.fixVersions.sort((a, b) => (a.label > b.label) ? 1 : -1);
        })
    }
    else {
        const version = fixVersion[0];


        tasks = await TaskModel.aggregate([
            {
                $match: {
                    "jiraItem.fixVersion": version, "jiraItem.type": "Epic", "diffItem.updatedTime": { $gte: startDate, $lte: endDate },

                }
            },
            {
                $group: {
                    _id: "$jiraItem.parentId",
                    tasks: { $push: "$$ROOT" },
                    TotalChanges: {
                        $sum: 1
                    }
                }
            }
        ])
        tasks.map((item, index) => {
            let updateCounter = 0;
            let deleteCounter = 0;
            let createCounter = 0;
            let tasksArray = item.tasks
            tasksArray.map((task, index) => {
                task.diffItem.updatedTime = formatDate(task.diffItem.updatedTime)
                if (task.diffItem.type === "Update") {
                    updateCounter++
                }
                else if (task.diffItem.type === "Create") {
                    createCounter++
                }
                else {
                    deleteCounter++
                }
            })
            item.Update = updateCounter
            item.Create = createCounter
            item.Delete = deleteCounter
        })
        let groupedArray = [
            { _id: "Green", features: [], featuresSize: 0 },
            { _id: "Yellow", features: [], featuresSize: 0 },
            { _id: "Red", features: [], featuresSize: 0 }
        ]

        tasks.map((item, index) => {
            let totalChanges = item.TotalChanges
            if (totalChanges >= 0 && totalChanges < 5) {
                groupedArray[0].features.push(item)
                groupedArray[0].featuresSize++
            }
            else if (totalChanges >= 5 && totalChanges < 10) {
                groupedArray[1].features.push(item)
                groupedArray[1].featuresSize++

            }
            else {
                groupedArray[2].features.push(item)
                groupedArray[2].featuresSize++

            }
        })
        tasks = groupedArray
    }
    res.send(tasks)
})

// ---------------------------------------------------------- changes in jira tickets ----------------------------------------------------------



router.post('/changeOfJIRATicketsStatus', async (req, res) => {
    const filterValue = req.body.values
    const filterStatus = req.body.status
    const filterQaRep = req.body.qaRepresentative
    const label = req.body.label
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    startDate = new Date(startDate)
    endDate = new Date(endDate)


    let dateFormat = '';
    if (label[0] == 'monthly') {
        dateFormat = "%Y-%m"
    }
    else if (label[0] == 'yearly') {
        dateFormat = "%Y"
    }
    else {
        dateFormat = "%Y-%m-%d"
    }


    //here we build the match expression according to the user's filters.


    let matchFilterValue = { "$and": [] };

    let ValToAgg = filterValue.length == 0 ? "$diffItem.updatedField.newValue" : `$diffItem.updatedField.${filterValue[0]}`

    if (filterValue.length == 0) {
        filterValue[0] = "newValue"
    }


    let filtersArray = [];

    //default filters

    filtersArray.push({ 'diffItem.type': 'Update' })
    filtersArray.push({ 'diffItem.updatedField.fieldName': 'status' })
    filtersArray.push({ "diffItem.updatedTime": { $gte: startDate } }, { "diffItem.updatedTime": { $lte: endDate } })

    //multiselect status
    if (filterStatus[0] != undefined && filterValue[0] != undefined) {
        if (filterStatus.length != 0) {
            let statusArray = []
            filterStatus.map(item => {
                if (filterValue == "newValue") {
                    statusArray.push({ "diffItem.updatedField.newValue": item })
                }
                else {
                    statusArray.push({ "diffItem.updatedField.oldValue": item })
                }
            })
            // orArray.push(statusArray);
            filtersArray.push({ "$or": statusArray })
        }
    }

    // multiselect QA REP
    if (filterQaRep[0] != undefined && filterValue[0] != undefined) {
        if (filterQaRep.length != 0) {
            let qaArray = []
            filterQaRep.map(item => {
                qaArray.push({ 'jiraItem.qaRepresentative': item })
            })
            // orArray.push(qaArray)
            filtersArray.push({ "$or": qaArray })
        }
    }


    if (filtersArray.length == 0) {
        delete matchFilterValue.$and;
    }
    else {
        matchFilterValue["$and"] = filtersArray
    }
    if (filterValue.length == 0) {
        matchFilterValue = {}
    }
    let tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: dateFormat, date: "$diffItem.updatedTime" } },
                    Val: ValToAgg

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {

                _id: "$_id.date",
                arr: { $push: { value: "$_id.Val", tasks: "$tasks", size: { $size: "$tasks" } } },
            }
        },
        {
            $sort: { _id: 1 }
        }
    ])

    if (label[0] == 'weekly') {
        tasks = weeklyLabel(startDate, endDate, tasks)
    }

    if (tasks.length != 0) {
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.value > b.value) ? 1 : -1);
        })
        let maxLength = -1;
        tasks.map((task, index) => {
            let sum = 0;
            task.arr.forEach(element => {
                element.tasks.map((task => {
                    task.diffItem.updatedTime = formatDate(task.diffItem.updatedTime)
                }))
                sum += element.size
                if (element.size > maxLength)
                    maxLength = element.size
            })
            tasks[index].sum = sum
        })

        tasks.map((task, index) => {
            tasks[index].maxLength = maxLength
        })

    }
    res.send(tasks);

})

router.post('/changeOfJIRATicketsStatusFilters', async (req, res) => {

    let tasks = []
    let matchFilters = ''
    let groupFilters = ''
    const { serverFilters } = req.body;

    let filterVal = 'newValue'
    filterStatus = ''
    if (filterVal == 'oldValue') {
        groupFilters = "$diffItem.updatedField.oldValue"
    }
    else {
        groupFilters = "$diffItem.updatedField.newValue"
    }
    if (filterStatus.length != 0) {
        matchFilters = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status',
        }
    }
    else {
        matchFilters = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status'
        }
    }

    tasks = await TaskModel.aggregate([
        {
            $match: matchFilters
        },
        {
            $group: {
                _id: null,
                status: { $addToSet: { "label": groupFilters, "value": groupFilters } },
                qa: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
            },
        }
    ])
    tasks.map((item, index) => {
        item.status.sort((a, b) => (a.label > b.label) ? 1 : -1);
        item.qa.sort((a, b) => (a.label > b.label) ? 1 : -1);
    })


    // console.log(tasks)
    res.send(tasks)

})





// --------------------------------------------------------------- delays in delivery ---------------------------------------------------------------------

router.post('/delaysInDelivery', async (req, res) => {


    const fixVersion = req.body.fixVersion[0]
    const jiraTypeFilter = req.body.jiraType
    const label = req.body.label
    const qaRepresentativeFilter = req.body.qaRepresentative
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    startDate = new Date(startDate)
    endDate = new Date(endDate)



    let dateFormat = '';

    if (label[0] == 'monthly') {
        dateFormat = "%Y-%m"
    }
    else if (label[0] == 'yearly') {
        dateFormat = "%Y"
    }
    else {
        dateFormat = "%Y-%m-%d"
    }



    let filtersArray = [];
    let matchFilterValue = { "$and": [] };


    filtersArray.push({
        "$or": [
            { "diffItem.type": "Create", "jiraItem.fixVersion": fixVersion },
            { "diffItem.type": "Delete", "jiraItem.fixVersion": fixVersion },
            {
                "diffItem.type": "Update",
                "$or": [
                    {
                        "diffItem.updatedField.fieldName": "fixVersion",
                        "$or": [
                            { "diffItem.updatedField.newValue": fixVersion },
                            { "diffItem.updatedField.oldValue": fixVersion }
                        ]
                    },
                    { "diffItem.updatedField.fieldName": "functionalTest" }
                ]
            }
        ]
    })
    

    filtersArray.push({ "diffItem.updatedTime": { $gte: startDate } }, { "diffItem.updatedTime": { $lte: endDate } })

    if (jiraTypeFilter[0] != undefined && jiraTypeFilter.length != 0) {
        let typesArray = []
        jiraTypeFilter.map((item, index) => {
            typesArray.push({ 'diffItem.type': item })
        })
        filtersArray.push({ "$or": typesArray })
    }

    // multiselect QA REP
    if (qaRepresentativeFilter[0] != undefined) {
        if (qaRepresentativeFilter.length != 0) {
            let qaArray = []
            qaRepresentativeFilter.map(item => {
                qaArray.push({ 'jiraItem.qaRepresentative': item })
            })
            // orArray.push(qaArray)
            filtersArray.push({ "$or": qaArray })
        }
    }

    matchFilterValue["$and"] = filtersArray

    let tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue

        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: dateFormat, date: "$diffItem.updatedTime" } },
                    value: "$diffItem.updatedField.fieldName",
                    type: "$diffItem.type"
                },
                tasks: { $push: "$$ROOT" },
            }

        },
        {
            $group: {

                _id: "$_id.date",
                arr: {
                    $push: {
                        value:
                        {
                            $cond: {
                                if: { $eq: ["$_id.value", "functionalTest"] },
                                then: "$_id.value",
                                else: "$_id.type"
                            }
                        },
                        type: {
                            $cond: {
                                if: { $eq: ["$_id.value", "functionalTest"] },
                                then: "$_id.type",
                                else: "$_id.value"
                            }
                        },
                        tasks: "$tasks", size: { $size: "$tasks" }
                    }
                },
            }
        },
        {
            $sort: { _id: 1 }
        }

    ])

    if (label[0] == 'weekly') {
        tasks = weeklyLabel(startDate, endDate, tasks)
    }

    if (tasks.length != 0) {
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.value > b.value) ? 1 : -1);
        })
        let maxLength = -1;
        tasks.map((task, index) => {
            let sum = 0;
            task.arr.forEach(element => {
                element.tasks.map((task => {
                    task.diffItem.updatedTime = formatDate(task.diffItem.updatedTime)
                }))
                sum += element.size
                if (element.size > maxLength)
                    maxLength = element.size
            })
            tasks[index].sum = sum
        })

        tasks.map((task, index) => {
            tasks[index].maxLength = maxLength
        })

    }

    res.send(tasks)


})

router.post('/delaysInDeliveryFilters', async (req, res) => {
    let filters = await TaskModel.aggregate([
        {
            $match: {}
        },
        {
            $group: {
                _id: null,
                fixVersion: { $addToSet: { "label": "$jiraItem.fixVersion", "value": "$jiraItem.fixVersion" } },
                jiraType: { $addToSet: { "label": "$jiraItem.jiraType", "value": "$jiraItem.jiraType" } },
                qa: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
            }
        }
    ])
    filters.map((item, index) => {
        item.fixVersion.sort((a, b) => (a.label > b.label) ? 1 : -1);
        item.jiraType.sort((a, b) => (a.label > b.label) ? 1 : -1);
        item.qa.sort((a, b) => (a.label > b.label) ? 1 : -1);
    })


    res.send(filters)

})




module.exports = router;