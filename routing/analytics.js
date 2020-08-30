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
                    _id:null,
                    labels: {$addToSet: {"label":"$diffItem.updatedField.fieldName"}}
                },
                //fieldNames: {$addToSet : "$diffItem.updatedField.fieldName"}

            
            }
        ])
    }
    else{
        const name = fieldName[0];
        tasks = await TaskModel.aggregate([
            {
                $match:{"diffItem.updatedField.fieldName":name, "diffItem.type": "Update"}


            },
            {
                $group: {
                    _id:null,
                    QA: {$addToSet: {"label":"$jiraItem.qaRepresentative"}},
                    Values: {$addToSet: {"label":"$diffItem.updatedField.newValue"}},
                    tasks:{$push: "$$ROOT"}
                },
                //fieldNames: {$addToSet : "$diffItem.updatedField.fieldName"}

            
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

    const filterValue = 'newValue'     //old or new value
    const filterStatus = 'Backlog'     // Done , in progress , Backlog ,In Integration ...
    const filterQaRep = 'Sally'

    // const filterValue = req.body.values[0]
    // const filterStatus = req.body.status[0] 
    // const filterQaRep = req.body.qaRepresentative[0] 

    console.log("nimer")
    console.log( filterValue, filterStatus, filterQaRep)

    //here we build the match expression according to the user's filters.
    let matchFilterValue = {}

    if (filterValue == 'newValue') {
        
        matchFilterValue = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status',
            'diffItem.updatedField.newValue': filterStatus,
            // 'jiraItem.qaRepresentative': filterQaRep
        }
    } else {
        matchFilterValue = {
            'diffItem.type': 'Update',
            'diffItem.updatedField.fieldName': 'status',
            'diffItem.updatedField.oldValue': filterStatus,
            // 'jiraItem.qaRepresentative': filterQaRep

        }
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


    console.log("YOUSEF")
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



//  !!-------------------------------------------- Sally --------------------------------------------!!
router.get('/changeOfJIRATicketsStatusFilters', async (req, res) => {

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
            'diffItem.updatedField.oldValue': filterStatus,
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
                _id:null,
                labels: {$addToSet: {"label": groupFilters,}}
            },
        }
    ])

    console.log(tasks)
    res.send(tasks)

})

module.exports = router;