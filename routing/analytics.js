const express = require("express");

const router = express.Router();
const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const TaskModel = require('../schemas/TaskSchema');

//app.get/post/put/delete => router.get/post/put/delete

router.post('/modificationByField', async (req, res) => {
    let tasks = []
    const { fieldName, values, qaRepresentative, startDate, endDate, label } = req.body;
    console.log(fieldName, values, label, qaRepresentative)

    //here we build the match expression according to the user's filters.
    let filtersArray = []
    let matchFilterValue = {
        "$and": []
    }
    if (fieldName.length != 0) {
        filtersArray.push({ "diffItem.updatedField.fieldName": fieldName[0] })
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
    console.log(JSON.stringify(matchFilterValue))
    tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
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

// router.post('/modificationByField', async (req, res) => {
//     let tasks = []
//     const { fieldName, values, qaRepresentative, startDate, endDate, label } = req.body;
//     console.log(fieldName, values, label, qaRepresentative)
//     if (fieldName.length == 0) { // returns all the tasks a month ago when reloading
//         tasks = await TaskModel.aggregate([
// {
//     $group: {
//         _id: {
//             date: { $dateToString: { format: "%Y-%m-%d", date: "$diffItem.updatedTime" } },
//             fieldName: "$diffItem.updatedField.fieldName"

//         },
//         tasks: { $push: "$$ROOT" },
//     }
// },
// {
//     $group: {
//         _id: "$_id.date",
//         arr: { $push: { fieldName: "$_id.fieldName", tasks: "$tasks", size: { $size: "$tasks" } } },

//     }

// }

//     ])
// }
//     else { // return tasks with the fieldName that I receive
//         const name = fieldName[0];
//         if (qaRepresentative.length == 0 && values.length == 0) { //match just according to fieldName
//             tasks = await TaskModel.aggregate([
//                 {
//                     $match: { "diffItem.updatedField.fieldName": name, "diffItem.type": "Update" }

//                 },
//                 {
//                     $group: {
//                         _id: {
//                             date: { $dateToString: { format: "%Y-%m-%d", date: "$diffItem.updatedTime" } },
//                             value: "$diffItem.updatedField.newValue"

//                         },
//                         tasks: { $push: "$$ROOT" },
//                     }
//                 },
//                 {
//                     $group: {
//                         _id: "$_id.date",
//                         arr: { $push: { value: "$_id.value", tasks: "$tasks", size: { $size: "$tasks" } } },

//                     }

//                 }

//             ])
//         }
//         else if (qaRepresentative.length > 0 && values.length == 0) { // match according to fieldName and qaRep

//         }
//         else if (values.length > 0 && qaRepresentative.length == 0) {

//         }
//         else {

//         }
//     }
// let maxLength = -1;
// let sumLength = 0;
// let myArray = tasks[0].arr;
// myArray.forEach(element => {
//     if (element.size > maxLength) {
//         maxLength = element.size
//     }
//     sumLength += element.size
// })
// tasks[0].maxLength = maxLength

// tasks[0].sumLength = sumLength
//     res.send(tasks)
// })



router.post('/modificationByFieldFilters', async (req, res) => {
    let tasks = []
    const { fieldName } = req.body
    if (fieldName.length == 0) { // runs to bring all the fieldNames when reloading
        tasks = await TaskModel.aggregate([
            {
                $group: {
                    _id: null,
                    label: { $addToSet: "$diffItem.updatedField.fieldName" }
                },
            },
            {
                $unwind: { path: "$label" }

            },
            {
                $project: { _id: 0, label: 1 }

            },
            {
                $sort: { label: 1 }

            }
        ])
    }
    else { // runs when choosing the fieldName
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
                }
            },
        ])
    }

    res.send(tasks)
})


router.post('/changeOfJIRATicketsStatus', async (req, res) => {

    // const filterValue = 'newValue'     //old or new value
    // const filterStatus = 'Backlog'     // Done , in progress , Backlog ,In Integration ...
    // const filterQaRep = 'Sally'

    const filterValue = req.body.values[0]
    const filterStatus = req.body.status[0]
    const filterQaRep = req.body.qaRepresentative[0]

    console.log("nimer")
    console.log(filterValue, filterStatus, filterQaRep)
    console.log("nimer")


    //here we build the match expression according to the user's filters.
    let matchFilterValue = {
        'diffItem.type': 'Update',
        'diffItem.updatedField.fieldName': 'status',

    }
    
    if (filterStatus != undefined) {
        matchFilterValue[`diffItem.updatedField.${filterValue}`] = filterStatus
    }

    if (filterQaRep != undefined) {
        matchFilterValue['jiraItem.qaRepresentative'] = filterQaRep
    }
   

    console.log(matchFilterValue)

    const tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {

                    Val: `$diffItem.updatedField.${filterValue}`

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {
                _id: "$_id.Val",
                arr: { $push: { tasks: "$tasks", size: { $size: "$tasks" } } },

            }

        }

    ])


    // console.log("YOUSEF")
    let total = 0;
    tasks.forEach(element => {
        total += element.arr[0].size
    })
    tasks.total = total
    // console.log(tasks)

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
                status: { $addToSet: { "label": groupFilters, "value":groupFilters } },
                qa: { $addToSet: { "label": "$jiraItem.qaRepresentative","value":"$jiraItem.qaRepresentative" } }
            },
        }
    ])


    console.log(tasks)
    res.send(tasks)

})


/*
1.filters and      NOT NOW =>  uiobj without filters
2.for each change in the filters, send new uiobj according to the filters applied
*/
module.exports = router;