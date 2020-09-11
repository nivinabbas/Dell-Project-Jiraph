const express = require("express");

const router = express.Router();
const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const TaskModel = require('../schemas/TaskSchema');

//app.get/post/put/delete => router.get/post/put/delete



router.post('/modificationByField', async (req, res) => {
    let tasks = []
    const { serverFilters } = req.body
    let { fieldName, values, qaRepresentative, startDate, endDate, label } = serverFilters;
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    let dateFormat = '';
    if (label[0] == 'daily') {
        dateFormat = "%Y-%m-%d"
    }
    else if (label[0] == 'yearly') {
        dateFormat = "%Y"
    }
    else {
        dateFormat = "%Y-%m"
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
    let maxLength = 0;
    let sumLength = 0;
    if (tasks.length > 0) {
        tasks.map((item, index) => {
            let myArray = item.arr;
            myArray.forEach(element => {
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
    console.log(priority, qaRepresentative, functionalTest, startDate, endDate, label)
    let dateFormat = '';
    if (label[0] == 'daily') {
        dateFormat = "%Y-%m-%d"
    }
    else if (label[0] == 'yearly') {
        dateFormat = "%Y"
    }
    else {
        dateFormat = "%Y-%m"
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
    // let d1 = new Date(tasks[0]._id)
    // console.log(d1)
    // console.log(new Date(d1.setDate(d1.getDate() + 5)))
    let maxLength = 0;
    let sumLength = 0;
    if (tasks.length > 0) {
        tasks.map((item, index) => {
            let myArray = item.arr;
            myArray.forEach(element => {
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
                    // QA: { $addToSet: { "label": "$jiraItem.qaRepresentative", "value": "$jiraItem.qaRepresentative" } }
                },
            }
        ])
        tasks.map((item, index) => {
            item.fixVersions.sort((a, b) => (a.label > b.label) ? 1 : -1);
            //item.QA.sort((a, b) => (a.label > b.label) ? 1 : -1);
        })
    }
    else {
        const version = fixVersion[0];
        
        tasks = await TaskModel.aggregate([
            {
                $match: { "jiraItem.fixVersion": version, "jiraItem.type": "Epic","diffItem.updatedTime": { $gte: startDate, $lte: endDate },
                  
           }
            },
            {
                $group: {
                    //type: "$diffItem.type", 
                    _id: "$jiraItem.parentId",
                    tasks: { $push: "$$ROOT" },
                    TotalChanges: {
                        $sum: 1
                    }
                }
            }
        ])
        let updateCounter = 0;
        let deleteCounter = 0;
        let createCounter = 0;
        tasks.map((item,index)=>{
            let tasks = item.tasks
            tasks.map((task,index)=>{
                if(task.diffItem.type === "Update"){
                    updateCounter++
                }
                else if(task.diffItem.type === "Create"){
                    createCounter++
                }
                else{
                    deleteCounter++
                }
            })
            item.Update = updateCounter
            item.Create = createCounter
            item.Delete = deleteCounter
        })
        let groupedArray = [
            {_id: "Green" , features:[] , featuresSize:0},
            {_id: "Yellow" , features:[] , featuresSize:0},
            {_id: "Red" , features:[] , featuresSize:0}
        ]

        tasks.map((item,index)=>{
            let totalChanges = item.TotalChanges
            if( totalChanges >= 0 && totalChanges <5){
                groupedArray[0].features.push(item)
                groupedArray[0].featuresSize++
            }
            else if( totalChanges >= 5 && totalChanges <10){
                groupedArray[1].features.push(item)
                groupedArray[1].featuresSize++

            }
            else{
                groupedArray[2].features.push(item)
                groupedArray[2].featuresSize++

            }
        })
        tasks = groupedArray
    }
    res.send(tasks)
})

// ---------------------------------------------------------- changes in jira tickets



// {featureID,TotalChanges,Tasks,update,create,delete}


/*

 [
    {Id:red , features:[{ id: featureId, arr : {type:create}, tasks}]}
    {Id:Green , }
    {Id:Yellow , }






 ]

*/
router.post('/changeOfJIRATicketsStatus', async (req, res) => {
    const filterValue = req.body.values
    const filterStatus = req.body.status
    const filterQaRep = req.body.qaRepresentative
    const label = req.body
    let { startDate, endDate } = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    let dateFormat = '';
    if (label[0] == 'daily') {
        dateFormat = "%Y-%m-%d"
    }
    else if (label[0] == 'yearly') {
        dateFormat = "%Y"
    }
    else {
        dateFormat = "%Y-%m"
    }


    //here we build the match expression according to the user's filters.
    console.log(filterValue, filterStatus, filterQaRep, endDate, startDate)

    let matchFilterValue = { "$and": [] };
    let ValToAgg = filterValue.length == 0 ? "$diffItem.updatedField.newValue" : `$diffItem.updatedField.${filterValue}`

    let filtersArray = [];

    //default filters

    filtersArray.push({ 'diffItem.type': 'Update' })
    filtersArray.push({ 'diffItem.updatedField.fieldName': 'status' })
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
    const tasks = await TaskModel.aggregate([
        {
            $match: matchFilterValue
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: dateFormat, date: "$diffItem.updatedTime" } },
                    Val: ValToAgg
                    // Val: `$diffItem.updatedField.${filterValue}`

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
    if (tasks.length != 0) {
        tasks.map((item, index) => {
            item.arr.sort((a, b) => (a.value > b.value) ? 1 : -1);
        })
        tasks.sort((a, b) => (a._id > b._id) ? 1 : -1);
        let maxLength = -1;
        tasks.map((task, index) => {
            let sum = 0;
            task.arr.forEach(element => {
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

router.post('/delaysInDelivery', (req, res) => {

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


    // console.log(filters)
    res.send(filters)

})




module.exports = router;