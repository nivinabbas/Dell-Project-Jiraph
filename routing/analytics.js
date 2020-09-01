const express = require("express");

const router = express.Router();
const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const TaskModel = require('../schemas/TaskSchema');

//app.get/post/put/delete => router.get/post/put/delete



router.post('/modificationByField', async (req, res) => {
    let tasks = []
    const { fieldName, values, label, qaRepresentative } = req.body;
    if (fieldName.length == 0) {
        tasks = await TaskModel.aggregate([
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$diffItem.updatedTime" } },
                        fieldName: "$diffItem.updatedField.fieldName"

                    },
                    tasks: { $push: "$$ROOT" },
                }
            },
            {
                $group: {
                    _id: "$_id.date",
                    arr: { $push: { fieldName: "$_id.fieldName", tasks: "$tasks", size: { $size: "$tasks" } } },

                }

            }

        ])
    }
    let maxLength = -1;
    let sumLength = 0;
    let myArray = tasks[0].arr;
    myArray.forEach(element => {
        if (element.size > maxLength) {
            maxLength = element.size
        }
        sumLength += element.size
    })
    tasks[0].maxLength = maxLength

    tasks[0].sumLength = sumLength

    res.send(tasks)
})



router.post('/modificationByFieldFilters', async (req, res) => {
    let tasks = []
    const { fieldName, values, label, qaRepresentative } = req.body;
    if (fieldName.length == 0) {
        tasks = await TaskModel.aggregate([
            {
                $group: {
                    _id: null,
                    labels: { $addToSet: { "label": "$diffItem.updatedField.fieldName" } }
                },
                //fieldNames: {$addToSet : "$diffItem.updatedField.fieldName"}


            }
        ])
    }
    else {
        const name = fieldName[0];
        tasks = await TaskModel.aggregate([
            {
                $match: { "diffItem.updatedField.fieldName": name, "diffItem.type": "Update" }


            },
            {
                $group: {
                    _id: null,
                    QA: { $addToSet: { "label": "$jiraItem.qaRepresentative" } },
                    Values: { $addToSet: { "label": "$diffItem.updatedField.newValue" } },
                    tasks: { $push: "$$ROOT" }
                },
                //fieldNames: {$addToSet : "$diffItem.updatedField.fieldName"}


            }
        ])
    }

    console.loglog(task)
    res.send(tasks)
})


router.post('/changeOfJIRATicketsStatus', async (req, res) => {

    // const filterValue = 'newValue'     //old or new value
    // const filterStatus = 'Backlog'     // Done , in progress , Backlog ,In Integration ...
    // const filterQaRep = 'Sally'

    const filterValue = req.body.values
    const filterStatus = req.body.status
    const filterQaRep = req.body.qaRepresentative

    console.log("nimer")
    console.log(filterValue, filterStatus, filterQaRep)
    console.log("nimer")


    //here we build the match expression according to the user's filters.


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    let matchFilterValue = { "$and": [] };

    let filtersArray = [];

    //default filters

    filtersArray.push({ 'diffItem.type': 'Update' })
    filtersArray.push({ 'diffItem.updatedField.fieldName': 'status' })

    // if (filterQaRep != undefined) {
    //     filtersArray['jiraItem.qaRepresentative'] = filterQaRep
    // }

    //multiselect status
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
            // orArray.push(statusArray);
            filtersArray.push({ "$or": statusArray })
        }
    }

    // multiselect QA REP
    if (filterQaRep[0] != undefined && filterValue[0] != undefined) {
        if (filterQaRep.length != 0) {
            let qaArray = []
            filterQaRep.map(item => {
                qaArray.push({ 'jiraItem.qaRepresentative': item })
            })
            // orArray.push(qaArray)
            filtersArray.push({ "$or": qaArray })
        }
    }


    if (filtersArray.length == 0) {
        delete matchFilterValue.$and;
    }
    else {
        matchFilterValue["$and"] = filtersArray
    }



    console.log(matchFilterValue)

    const tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$diffItem.updatedTime" } },
                    Val: `$diffItem.updatedField.${filterValue}`

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {

                _id: "$_id.date",
                arr: { $push: { value: "$_id.Val", tasks: "$tasks", size: { $size: "$tasks" } } },

            }

        }

    ])

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // console.log("YOUSEF")
    let maxLength = -1;
    let sum = 0;
    tasks[0].arr.forEach(element => {
        sum += element.size
        if (element.size > maxLength)
            maxLength = element.size
    })
    tasks[0].sum = sum
    tasks[0].maxLength = maxLength
    console.log(tasks[0].arr)

    // tasks.forEach(element => {
    //     console.log(element.arr[0].tasks[0].jiraItem)
    // })


    res.send(tasks);

})



//  !!-------------------------------------------- Sally --------------------------------------------!!
router.post('/changeOfJIRATicketsStatusFilters', async (req, res) => {

    console.log("AAAAAAAAAAAAAAAAAAAAA")
    let tasks = []
    let matchFilters = ''
    let groupFilters = ''
    const { serverFilters } = req.body;
    console.log(serverFilters)

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
            // 'diffItem.updatedField.oldValue': filterStatus,
            // 'jiraItem.qaRepresentative': filterQaRep
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


    console.log(tasks)
    res.send(tasks)

})


/*
1.filters and      NOT NOW =>  uiobj without filters
2.for each change in the filters, send new uiobj according to the filters applied
*/
module.exports = router;