const express = require('express');
const app = express();

    
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'))


const url = "mongodb+srv://nimer:N1N1N1N1@cluster0.tejcy.mongodb.net/test";


const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
    userInfo: {
        employeeName: String,
        employeeEmail: String,
        employeeRole: String,
        password: String
    }
})



const UIObject = [
    { label: String, order: Number, Tasks: Array },
    { label: String, order: Number, Tasks: Array },
]

const Task = mongoose.model('Task', {
    jiraItem: {
        jiraId: String,
        jiraName: String,
        jiraType: String,
        priority: String,
        status: String,
        specialFields: {
            jiraParentId: String,
            functionalTest: Boolean,
            qaRepresentative: String,
            fixVersion: String
        }
    },
    qcItem: {
        requirmentId: String,
        requirementType: String,
        status: String
    },
    diffItem: {
        type: { type: String },
        updateTime: Number,
        updatedFields: [{
            fieldName: String,
            oldValue: String,
            newValue: String
        }]
    }
    // taskItem: {
    //   user: User,
    //   isDone: Boolean,
    //   updatedTime: Date,
    //   createdTime: Date
    // }
});
//Date.now()Date.now()-5.256e+9


app.get('/getUpdated', (req, res) => {
    Task.find({}, function (err, docs) {
        res.send(docs)
    })
})


/* jeries sort with val
app.get('/getUpdatedByStatus', (req, res) => {
    console.log("hi")
    Task.find({'diffItem.updatedFields':{"$elemMatch":{'fieldName':'status','newVal':"critical"}}},(err,docs)=>{
            res.send(docs);
        console.log(err,docs)
      })
    })
    */

// app.get('/getUpdatedByStatus', (req, res) => {
//     const { sadasd } = req.body;
//     Task.find({ 'diffItem.updatedFields': { "$elemMatch": { 'fieldName': 'status' } }, 'diffItem.type': 'Update' }, (err, docs) => {
//         res.send(docs);
//         console.log(err, docs)
//     })
// })


app.post('/getUpdatedTasksByFieldNameDaily', async (req, res) => {
    console.log(req.body)
    const { fieldName, dateToSendEnd, dateToSendStart } = req.body;
    console.log(fieldName)
    let tasks;
    if (fieldName == "all") {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updateTime": { $gte: dateToSendStart, $lte: dateToSendEnd },
                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: {
                                $add: [
                                    new Date(0),
                                    {
                                        $multiply: [1, "$diffItem.updateTime"],
                                    },
                                ],
                            },
                        },
                    },
                    tasks: {
                        // $push: "$$ROOT"
                          $push: {
                              jiraItem: "$jiraItem",
                              qcItem: "$qcItem",
                              diffItem: "$diffItem"
                          }
                    },
                    numOfTasks: {
                        $sum: 1
                    }



                }

            },
            {$sort: {"tasks.diffItem.updateTime":1}}  

            ]

        )

    }
    else {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updatedFields": { "$elemMatch": { 'fieldName': fieldName } },
                    "diffItem.updateTime": { $gte: dateToSendStart, $lte: dateToSendEnd },

                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: {
                                $add: [
                                    new Date(0),
                                    {
                                        $multiply: [1, "$diffItem.updateTime"],
                                    },
                                ],
                            },
                        },
                    },
                    tasks: {
                        $push: "$$ROOT"
                        //   $push: {
                        //       jiraItem: "$jiraItem",
                        //       qcItem: "$qcItem",
                        //       diffItem: "$diffItem"
                        //   }
                    },
                    numOfTasks: {
                        $sum: 1
                    }
                }
            },
            {$sort: {"tasks.diffItem.updateTime":1}}

            ]

        )

    }
    res.send(tasks)
    console.log(tasks);
})
app.post('/getUpdatedTasksByFieldNameMonthly', async (req, res) => {
    console.log(req.body)
    const { fieldName, dateToSendEnd, dateToSendStart } = req.body;
    console.log(fieldName)
    let tasks;
    if (fieldName == "all") {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updateTime": { $gte: dateToSendStart, $lte: dateToSendEnd },
                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {
                        $dateToString: {
                            format: "%m-%Y",
                            date: {
                                $add: [
                                    new Date(0),
                                    {
                                        $multiply: [1, "$diffItem.updateTime"],
                                    },
                                ],
                            },
                        },
                    },
                    tasks: {
                        $push: "$$ROOT"
                        //   $push: {
                        //       jiraItem: "$jiraItem",
                        //       qcItem: "$qcItem",
                        //       diffItem: "$diffItem"
                        //   }
                    },
                    numOfTasks: {
                        $sum: 1
                    }

                }
            },
            {$sort: {"tasks.diffItem.updateTime":1}}

            ]

        )

    }
    else {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updatedFields": { "$elemMatch": { 'fieldName': fieldName } },
                    "diffItem.updateTime": { $gte: dateToSendStart, $lte: dateToSendEnd },

                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {
                        $dateToString: {
                            format: "%m-%Y",
                            date: {
                                $add: [
                                    new Date(0),
                                    {
                                        $multiply: [1, "$diffItem.updateTime"],
                                    },
                                ],
                            },
                        },
                    },
                    tasks: {
                        $push: "$$ROOT"
                        //   $push: {
                        //       jiraItem: "$jiraItem",
                        //       qcItem: "$qcItem",
                        //       diffItem: "$diffItem"
                        //   }
                    },
                    numOfTasks: {
                        $sum: 1
                    }
                }
            },
            {$sort: {"tasks.diffItem.updateTime":1}}

            ]

        )

    }
    res.send(tasks)
    console.log(tasks);
})
app.post('/getUpdatedTasksByFieldNameYearly', async (req, res) => {
    console.log(req.body)
    const { fieldName, dateToSendEnd, dateToSendStart } = req.body;
    console.log(fieldName)
    let tasks;
    if (fieldName == "all") {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updateTime": { $gte: dateToSendStart, $lte: dateToSendEnd },
                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {
                        $dateToString: {
                            format: "%Y",
                            date: {
                                $add: [
                                    new Date(0),
                                    {
                                        $multiply: [1, "$diffItem.updateTime"],
                                    },
                                ],
                            },
                        },
                    },
                    tasks: {
                        $push: "$$ROOT"
                        //   $push: {
                        //       jiraItem: "$jiraItem",
                        //       qcItem: "$qcItem",
                        //       diffItem: "$diffItem"
                        //   }
                    },
                    numOfTasks: {
                        $sum: 1
                    }

                }
            },
            {$sort: {"tasks.diffItem.updateTime":1}}

            ]

        )

    }
    else {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updatedFields": { "$elemMatch": { 'fieldName': fieldName } },
                    "diffItem.updateTime": { $gte: dateToSendStart, $lte: dateToSendEnd },

                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {
                        $dateToString: {
                            format: "%Y",
                            date: {
                                $add: [
                                    new Date(0),
                                    {
                                        $multiply: [1, "$diffItem.updateTime"],
                                    },
                                ],
                            },
                        },
                    },
                    tasks: {
                        $push: "$$ROOT"
                        //   $push: {
                        //       jiraItem: "$jiraItem",
                        //       qcItem: "$qcItem",
                        //       diffItem: "$diffItem"
                        //   }
                    },
                    numOfTasks: {
                        $sum: 1
                    }
                }
            },
            {$sort: {"tasks.diffItem.updateTime":1}}

            ]

        )

    }
    res.send(tasks)
    console.log(tasks);
})




app.post('/getUpdatedTasksByStatus', async (req, res) => {
    console.log(req.body)
    const { status, dateToSend, oldnewvalue } = req.body;
    let tasks;
    if (status == "all") {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updatedFields": { "$elemMatch": { 'fieldName': 'status' } },
                    "diffItem.updateTime": { $gte: dateToSend },
                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {},
                    tasks: {
                        $push: {
                            jiraItem: "$jiraItem",
                            qcItem: "$qcItem",
                            diffItem: "$diffItem"
                        }
                    }
                }
            },

            ]

        )

    }
    else {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updatedFields": { "$elemMatch": { 'fieldName': 'status' } },
                    [`diffItem.updatedFields.${oldnewvalue}`]: status,
                    "diffItem.updateTime": { $gte: dateToSend },
                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {},
                    tasks: {
                        $push: {
                            jiraItem: "$jiraItem",
                            qcItem: "$qcItem",
                            diffItem: "$diffItem"
                        }
                    }
                }
            },

            ]

        )

    }
    res.send(tasks)
    console.log(tasks);
})



app.post('/getUpdatedTasksByPriority', async (req, res) => {
    console.log(req.body)
    const { priority, dateToSend, oldnewvalue } = req.body;
    let tasks;
    if (priority == "all") {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updatedFields": { "$elemMatch": { 'fieldName': 'priority' } },
                    "diffItem.updateTime": { $gte: dateToSend },
                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {},
                    tasks: {
                        $push: {
                            jiraItem: "$jiraItem",
                            qcItem: "$qcItem",
                            diffItem: "$diffItem"
                        }
                    }
                }
            },

            ]

        )

    }
    else {
        tasks = await Task.aggregate(
            [{

                $match: {
                    "diffItem.updatedFields": { "$elemMatch": { 'fieldName': 'priority' } },
                    [`diffItem.updatedFields.${oldnewvalue}`]: priority,
                    "diffItem.updateTime": { $gte: dateToSend },
                }
            },
            {
                $group: {
                    // label: {`daily`},

                    _id: {},
                    tasks: {
                        $push: {
                            jiraItem: "$jiraItem",
                            qcItem: "$qcItem",
                            diffItem: "$diffItem"
                        }
                    }
                }
            },

            ]

        )

    }
    res.send(tasks)
    console.log(tasks);
})

















// const newData =[
//         {
//             "diffItem": {
//                 "updateTime":1568309401000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "status", 
//                         "newValue": "In Progress", 
//                         "oldValue": "Done"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Backlog", 
//                 "jiraType": "Epic", 
//                 "jiraName": "PSI 41: SAR Support for FSCK/Recovery", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_41", 
//                 "jiraId": "TRIES-41773", 
//                 "jiraParentId": "TRIF-842"
//             }, 
//             "qcItem": {
//                 "status": "Backlog", 
//                 "requirementType": "Epic", 
//                 "requirementId": "2164"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1568395801000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "status", 
//                         "newValue": "In Progress", 
//                         "oldValue": "Done"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Implementing", 
//                 "jiraType": "Epic", 
//                 "jiraName": "PSI 41: FSCK Support for Late Dedup and VLB Defrag Phase 1 & 2", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_41", 
//                 "jiraId": "TRIES-37201", 
//                 "jiraParentId": "TRIF-842"
//             }, 
//             "qcItem": {
//                 "status": "In Progress", 
//                 "requirementType": "Epic", 
//                 "requirementId": "2011"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1568482201000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "status", 
//                         "newValue": "In Progress", 
//                         "oldValue": "Done"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P01", 
//                 "status": "Done", 
//                 "jiraType": "Epic", 
//                 "jiraName": "PSI 39: RAID fsck - Infrastructure update and validation rules expansion", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_39", 
//                 "jiraId": "TRIES-36948", 
//                 "jiraParentId": "TRIF-842"
//             }, 
//             "qcItem": {
//                 "status": "Done", 
//                 "requirementType": "Epic", 
//                 "requirementId": "2008"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1568568601000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "status", 
//                         "newValue": "In Progress", 
//                         "oldValue": "Done"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Backlog", 
//                 "jiraType": "Epic", 
//                 "jiraName": "PSI 40: Fault Containment - FSCK support", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_41", 
//                 "jiraId": "TRIES-34825", 
//                 "jiraParentId": "TRIF-842"
//             }, 
//             "qcItem": {
//                 "status": "Backlog", 
//                 "requirementType": "Epic", 
//                 "requirementId": "2009"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1568655001000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "status", 
//                         "newValue": "In Progress", 
//                         "oldValue": "Done"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Implementing", 
//                 "jiraType": "Epic", 
//                 "jiraName": "PSI 41: RAID fsck - Support V2 new features", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_41", 
//                 "jiraId": "TRIES-34722", 
//                 "jiraParentId": "TRIF-842"
//             }, 
//             "qcItem": {
//                 "status": "In Progress", 
//                 "requirementType": "Epic", 
//                 "requirementId": "1956"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1568741401000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "priority", 
//                         "newValue": "Low", 
//                         "oldValue": "High"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P01", 
//                 "status": "Done", 
//                 "jiraType": "Epic", 
//                 "jiraName": "PSI 40: RAID fsck - Infrastructure update and validation rules expansion", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_40", 
//                 "jiraId": "TRIES-32895", 
//                 "jiraParentId": "TRIF-842"
//             }, 
//             "qcItem": {
//                 "status": "Done", 
//                 "requirementType": "Epic", 
//                 "requirementId": "1892"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1568827801000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "priority", 
//                         "newValue": "Low", 
//                         "oldValue": "High"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Backlog", 
//                 "jiraType": "Epic", 
//                 "jiraName": "Quality: PSI 41: FSCK Test Support for FH-C DP Features", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_41", 
//                 "jiraId": "TRIES-28531", 
//                 "jiraParentId": "TRIF-842"
//             }, 
//             "qcItem": {
//                 "status": "Backlog", 
//                 "requirementType": "Epic", 
//                 "requirementId": "2171"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1568914201000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "priority", 
//                         "newValue": "Low", 
//                         "oldValue": "High"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Done", 
//                 "jiraType": "Feature", 
//                 "jiraName": "Display cluster time in GUI and Resync when NTP between nodes are out of sync", 
//                 "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "Foothills", 
//                 "jiraId": "TRIF-789", 
//                 "jiraParentId": "TRII-67"
//             }, 
//             "qcItem": {
//                 "status": "N/A", 
//                 "requirementType": "Feature", 
//                 "requirementId": "1765"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1569000601000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "priority", 
//                         "newValue": "Low", 
//                         "oldValue": "High"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Implementing", 
//                 "jiraType": "Feature", 
//                 "jiraName": "Warning State for Job Steps  is not intuitively available for users", 
//                 "qaRepresentative": "bjack@emc.com", 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "Foothills", 
//                 "jiraId": "TRIF-761", 
//                 "jiraParentId": "TRII-23"
//             }, 
//             "qcItem": {
//                 "status": "N/A", 
//                 "requirementType": "Feature", 
//                 "requirementId": "1918"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1569087001000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "priority", 
//                         "newValue": "Low", 
//                         "oldValue": "High"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P01", 
//                 "status": "Done", 
//                 "jiraType": "Epic", 
//                 "jiraName": "GUI  implementation, testing for TRIF-575: Add node's CPU stats to historical performance metrics", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_38", 
//                 "jiraId": "TRIES-15409", 
//                 "jiraParentId": "TRIF-575"
//             }, 
//             "qcItem": {
//                 "status": "Done", 
//                 "requirementType": "Epic", 
//                 "requirementId": "1915"
//             }
//         }, 
//         {
//             "diffItem": {
//                 "updateTime":1569173401000, 
//                 "type": "Update", 
//                 "updatedFields": [
//                     {
//                         "fieldName": "priority", 
//                         "newValue": "Low", 
//                         "oldValue": "High"
//                     }
//                 ]
//             }, 
//             "jiraItem": {
//                 "priority": "P00", 
//                 "status": "Done", 
//                 "jiraType": "Epic", 
//                 "jiraName": "TMA Implementation & Test : TRIF-575 - Node Affinity", 
//                 "qaRepresentative": null, 
//                 "functionalTest": "Yes", 
//                 "fixVersion": "PSI_39", 
//                 "jiraId": "TRIES-15217", 
//                 "jiraParentId": "TRIF-575"
//             }, 
//             "qcItem": {
//                 "status": "Done", 
//                 "requirementType": "Epic", 
//                 "requirementId": "1916"
//             }
//         }, ]
// Task.insertMany(newData);






















app.listen(4000, () => { console.log("App is Listening to 4000") })



