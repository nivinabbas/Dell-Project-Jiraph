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
                    _id: {
                        fieldName: "$diffItem.updatedField.fieldName"

                    },
                }
            }
        ])
    }

    res.send(tasks)
})


router.get('/changeOfJIRATicketsStatus', async (req, res) => {

    /*
    const tasks = await TaskModel.aggregate([
        {
            $match: {
                'diffItem.type': 'Update',
                'diffItem.updatedField.fieldName': 'status'
            }
        },
        {
            $group: {
                _id: {

                    newVal: "$diffItem.updatedField.newValue"

                },
                tasks: { $push: "$$ROOT" },
            }
        },
        {
            $group: {
                _id: "$_id.newVal",
                arr: { $push: { tasks: "$tasks" , size: { $size: "$tasks" }} },

            }

        }

    ])


    let total = 0;
    tasks.forEach(element => {
        total += element.arr[0].size
    })
    tasks.total = total
    console.log(tasks)
    */
    //-------------------------------------- end of priority 1 --------------------------------------//


    
    // //NOTE : ask nimer to set his default value on load.
    // const filterValue = 'oldValue' //old or new value
    // const filterStatus = 'Backlog'     // Done , in progress , Backlog ,In Integration ...

    // //here we build the match expression according to the user's filters.
    // let matchFilterValue = {}

    // if (filterValue == 'newValue') {
    //     matchFilterValue = {
    //         'diffItem.type': 'Update',
    //         'diffItem.updatedField.fieldName': 'status',
    //         'diffItem.updatedField.newValue': filterStatus
    //     }
    // }else{
    //     matchFilterValue = {
    //         'diffItem.type': 'Update',
    //         'diffItem.updatedField.fieldName': 'status',
    //         'diffItem.updatedField.oldValue': filterStatus
    //     }
    // }


    // const tasks = await TaskModel.aggregate([
    //     {
    //         $match: matchFilterValue
    //     },
    //     {
    //         $group: {
    //             _id: {

    //                 Val: `$diffItem.updatedField.${filterValue}`

    //             },
    //             tasks: { $push: "$$ROOT" },
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$_id.Val",
    //             arr: { $push: { tasks: "$tasks", size: { $size: "$tasks" } } },

    //         }

    //     }

    // ])


    // let total = 0;
    // tasks.forEach(element => {
    //     total += element.arr[0].size
    // })
    // tasks.total = total
    // console.log(tasks)

    // tasks.forEach(element => {
    //     console.log(element.arr[0].size)
    // })

    //-------------------------------------- end of priority 2 --------------------------------------//


    //NOTE : ask nimer to set his default value on load.
    const filterValue = 'oldValue' //old or new value
    const filterStatus = 'Backlog'     // Done , in progress , Backlog ,In Integration ...
    const filterQaRep = 'Sally'
    //here we build the match expression according to the user's filters.
    let matchFilterValue = {}

    if (filterValue == 'newValue') {
        matchFilterValue = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status',
            'diffItem.updatedField.newValue': filterStatus,
            'jiraItem.qaRepresentative': filterQaRep
        }
    }else{
        matchFilterValue = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status',
            'diffItem.updatedField.oldValue': filterStatus,
            'jiraItem.qaRepresentative': filterQaRep

        }
    }


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


    let total = 0;
    tasks.forEach(element => {
        total += element.arr[0].size
    })
    tasks.total = total
    console.log(tasks)

    tasks.forEach(element => {
        console.log(element.arr[0].tasks[0].jiraItem)
    })


    res.send(tasks);

})

module.exports = router;