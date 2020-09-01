const express = require("express");

const router = express.Router();
const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const TaskModel = require('../schemas/TaskSchema');

//app.get/post/put/delete => router.get/post/put/delete



router.post('/modificationByField', async (req, res) => {
    let tasks = []
    const { serverFilters } = req.body
    const { fieldName, values, qaRepresentative, startDate, endDate, label } = serverFilters;
    console.log(fieldName, values, label, qaRepresentative)
    // let dateFormat = '';
    // if (label[0] == 'daily') {
    //     dateFormat = "%Y-%m-%d"
    // }
    // else if (label[0] == 'yearly') {
    //     dateFormat = "%Y"
    // }
    // else {
    //     dateFormat = "%Y-%m"
    // }


    //here we build the match expression according to the user's filters.

    let filtersArray = [{ "diffItem.type": "Update" }] // add the startdate and enddate and label here
    let matchFilterValue = {
        "$and": []
    }
    if (fieldName.length != 0) {
        filtersArray.push({ "diffItem.updatedField.fieldName": fieldName[0] })
    }
    if (qaRepresentative.length != 0) {
        filtersArray.push({ "jiraItem.qaRepresentative": qaRepresentative[0] })
    }
    if (values.length != 0) {
        let valuesArray = []
        values.map((item, index) => {
            valuesArray.push({ "diffItem.updatedField.newValue": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }
    // if (filtersArray.length == 0) { // we should remove this condition after we add the time
    //     delete matchFilterValue.$and;
    // }
    // else {
    matchFilterValue["$and"] = filtersArray
    //  }

    tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$diffItem.updatedTime" } },
                    fieldName: "$diffItem.updatedField.fieldName"

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {
                _id: "$_id.date",
                //_id: { $dateFromString: { dateString: "$_id.date" , format: "%Y-%m-%d" } },
                arr: { $push: { fieldName: "$_id.fieldName", tasks: "$tasks", size: { $size: "$tasks" } } },

            }

        }
    ])
    // let d1 = new Date(tasks[0]._id)
    // console.log(d1)
    // console.log(new Date(d1.setDate(d1.getDate() + 5)))
    let maxLength = 0;
    let sumLength = 0;
    if (tasks.length > 0) {
        tasks.map((item, index) => {
            let myArray = item.arr;
            myArray.forEach(element => {
                if (element.size > maxLength) {
                    maxLength = element.size
                }
                sumLength += element.size
            })
            item.maxLength = maxLength
            item.sumLength = sumLength
            //maxLength=0;
            sumLength = 0;
        })
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.fieldName > b.fieldName) ? 1 : -1);
            if (item.maxLength < maxLength) {
                item.maxLength = maxLength
            }
        })
    }
    res.send(tasks)
})


router.post('/modificationByFieldFilters', async (req, res) => {
    let tasks = []
    const { fieldName } = req.body
    if (fieldName.length == 0) { // runs to bring all the fieldNames and QA when reloading
        tasks = await TaskModel.aggregate([
            {
                $group: {
                    _id: null,
                    labels: { $addToSet: { "label": "$diffItem.updatedField.fieldName", "value": "$diffItem.updatedField.fieldName" } },
                    QA: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
                },
            }
        ])
        tasks.map((item, index) => {
            item.labels.sort((a, b) => (a.label > b.label) ? 1 : -1);
            item.QA.sort((a, b) => (a.label > b.label) ? 1 : -1);
        })
    }
    else { // bring all the Values for the fieldName
        const name = fieldName[0];
        tasks = await TaskModel.aggregate([
            {
                $match: { "diffItem.updatedField.fieldName": name, "diffItem.type": "Update" }
            },
            {
                $group: {
                    _id: null,
                    // QA: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } },
                    Values: { $addToSet: { "label": "$diffItem.updatedField.newValue", "value": "$diffItem.updatedField.newValue" } },
                }
            },
        ])
        tasks.map((item, index) => {
            item.Values.sort((a, b) => (a.label > b.label) ? 1 : -1);
        })
    }

    res.send(tasks)
})


router.post('/deletedJiraTickets', async (req, res) => {
    let tasks = []
    const { serverFilters } = req.body
    const { priority, qaRepresentative, functionalTest, startDate, endDate, label } = serverFilters;
    console.log(priority, qaRepresentative, functionalTest, startDate, endDate, label)
    // let dateFormat = '';
    // if (label[0] == 'daily') {
    //     dateFormat = "%Y-%m-%d"
    // }
    // else if (label[0] == 'yearly') {
    //     dateFormat = "%Y"
    // }
    // else {
    //     dateFormat = "%Y-%m"
    // }


    //here we build the match expression according to the user's filters.

    let filtersArray = [{ "diffItem.type": "Delete" }] // add the startdate and enddate and label here
    let matchFilterValue = {
        "$and": []
    }
    if (priority.length != 0) {
        let valuesArray = []
        priority.map((item, index) => {
            valuesArray.push({ "jiraItem.priority": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }
    if (qaRepresentative.length != 0) {
        let valuesArray = []
        qaRepresentative.map((item, index) => {
            valuesArray.push({ "jiraItem.qaRepresentative": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }
    if (functionalTest.length != 0) {
        let valuesArray = []
        functionalTest.map((item, index) => {
            valuesArray.push({ "jiraItem.functionalTest": item })
        })
        filtersArray.push({ "$or": valuesArray })
    }
    // if (filtersArray.length == 0) { // we should remove this condition after we add the time
    //     delete matchFilterValue.$and;
    // }
    //else {
    matchFilterValue["$and"] = filtersArray
    //}

    tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$diffItem.updatedTime" } },
                    priority: "$jiraItem.priority"

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {
                _id: "$_id.date",
                //_id: { $dateFromString: { dateString: "$_id.date" , format: "%Y-%m-%d" } },
                arr: { $push: { priority: "$_id.priority", tasks: "$tasks", size: { $size: "$tasks" } } },

            }

        }
    ])
    // let d1 = new Date(tasks[0]._id)
    // console.log(d1)
    // console.log(new Date(d1.setDate(d1.getDate() + 5)))
    let maxLength = 0;
    let sumLength = 0;
    if (tasks.length > 0) {
        tasks.map((item, index) => {
            let myArray = item.arr;
            myArray.forEach(element => {
                if (element.size > maxLength) {
                    maxLength = element.size
                }
                sumLength += element.size
            })
            item.maxLength = maxLength
            item.sumLength = sumLength
            //maxLength=0;
            sumLength = 0;
        })
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
            if (item.maxLength < maxLength) {
                item.maxLength = maxLength
            }
        })
    }
    res.send(tasks)
})


router.post('/deletedJiraTicketsFilters', async (req, res) => {
    let tasks = []
    const { startDate, endDate, label } = req.body
    //if (fieldName.length == 0) { // runs to bring all the fieldNames and QA when reloading
    tasks = await TaskModel.aggregate([
        {
            $match: { "diffItem.type": "Delete" }
        },
        {
            $group: {
                _id: null,
                priorities: { $addToSet: { "label": "$jiraItem.priority", "value": "$jiraItem.priority" } },
                QA: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
            },
        }
    ])
    tasks.map((item, index) => {
        item.priorities.sort((a, b) => (a.label > b.label) ? 1 : -1);
        item.QA.sort((a, b) => (a.label > b.label) ? 1 : -1);
    })
    //  }
    // else { // bring all the QA and Values
    //     const name = fieldName[0];
    //     tasks = await TaskModel.aggregate([
    //         {
    //             $match: { "diffItem.updatedField.fieldName": name, "diffItem.type": "Update" }
    //         },
    //         {
    //             $group: {
    //                 _id: null,
    //                 // QA: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } },
    //                 Values: { $addToSet: { "label": "$diffItem.updatedField.newValue", "value": "$diffItem.updatedField.newValue" } },
    //             }
    //         },
    //     ])
    //     tasks.map((item, index) => {
    //         item.Values.sort((a, b) => (a.label > b.label) ? 1 : -1);
    //     })
    // }

    res.send(tasks)

})


router.post('/changeOfJIRATicketsStatus', async (req, res) => {
    const filterValue = req.body.values
    const filterStatus = req.body.status
    const filterQaRep = req.body.qaRepresentative

    //here we build the match expression according to the user's filters.
    console.log(filterValue, filterStatus, filterQaRep)

    let matchFilterValue = { "$and": [] };
    let ValToAgg = filterValue.length == 0 ? "$diffItem.updatedField.newValue" : `$diffItem.updatedField.${filterValue}`

    let filtersArray = [];

    //default filters

    filtersArray.push({ 'diffItem.type': 'Update' })
    filtersArray.push({ 'diffItem.updatedField.fieldName': 'status' })
    //multiselect status
    if (filterStatus[0] != undefined && filterValue[0] != undefined) {
        if (filterStatus.length != 0) {
            let statusArray = []
            filterStatus.map(item => {
                if (filterValue == "newValue") {
                    statusArray.push({ "diffItem.updatedField.newValue": item })
                }
                else {
                    statusArray.push({ "diffItem.updatedField.oldValue": item })
                }
            })
            // orArray.push(statusArray);
            filtersArray.push({ "$or": statusArray })
        }
    }
    // multiselect QA REP
    if (filterQaRep[0] != undefined && filterValue[0] != undefined) {
        if (filterQaRep.length != 0) {
            let qaArray = []
            filterQaRep.map(item => {
                qaArray.push({ 'jiraItem.qaRepresentative': item })
            })
            // orArray.push(qaArray)
            filtersArray.push({ "$or": qaArray })
        }
    }
    if (filtersArray.length == 0) {
        delete matchFilterValue.$and;
    }
    else {
        matchFilterValue["$and"] = filtersArray
    }
    if (filterValue.length == 0) {
        matchFilterValue = {}
    }
    const tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$diffItem.updatedTime" } },
                    Val: ValToAgg
                    // Val: `$diffItem.updatedField.${filterValue}`

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {

                _id: "$_id.date",
                arr: { $push: { value: "$_id.Val", tasks: "$tasks", size: { $size: "$tasks" } } },
            }
        }
    ])
    if (tasks.length != 0) {
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.value > b.value) ? 1 : -1);
        })
        tasks.sort((a, b) => (a._id > b._id) ? 1 : -1);
        let maxLength = -1;
        tasks.map((task, index) => {
            let sum = 0;
            task.arr.forEach(element => {
                sum += element.size
                if (element.size > maxLength)
                    maxLength = element.size
            })
            tasks[index].sum = sum
        })

        tasks.map((task, index) => {
            tasks[index].maxLength = maxLength
        })

    }
    res.send(tasks);

})

//  !!-------------------------------------------- Sally --------------------------------------------!!
router.post('/changeOfJIRATicketsStatusFilters', async (req, res) => {

    let tasks = []
    let matchFilters = ''
    let groupFilters = ''
    const { serverFilters } = req.body;

    let filterVal = 'newValue'
    filterStatus = ''
    if (filterVal == 'oldValue') {
        groupFilters = "$diffItem.updatedField.oldValue"
    }
    else {
        groupFilters = "$diffItem.updatedField.newValue"
    }
    if (filterStatus.length != 0) {
        matchFilters = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status',
        }
    }
    else {
        matchFilters = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status'
        }
    }

    tasks = await TaskModel.aggregate([
        {
            $match: matchFilters
        },
        {
            $group: {
                _id: null,
                status: { $addToSet: { "label": groupFilters, "value": groupFilters } },
                qa: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
            },
        }
    ])
    tasks.map((item, index) => {
        item.status.sort((a, b) => (a.label > b.label) ? 1 : -1);
        item.qa.sort((a, b) => (a.label > b.label) ? 1 : -1);
    })


    // console.log(tasks)
    res.send(tasks)

})



router.get('/delaysInDelivery', (req, res) => {

})

router.get('/delaysInDeliveryFilter', async (req, res) => {
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


    // console.log(filters)
    res.send(filters)

})
module.exports = router;