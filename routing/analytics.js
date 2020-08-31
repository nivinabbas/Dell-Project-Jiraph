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

module.exports = router;