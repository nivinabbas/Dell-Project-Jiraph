const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const TaskModel = require('./schemas/TaskSchema');



app.use(express.static('public'))

const url = "mongodb+srv://nimer:N1N1N1N1@cluster0.tejcy.mongodb.net/server";
//const url = "mongodb+srv://Marshood:raMHdQuDOBxwrcss@cluster0.ifcjp.mongodb.net/jiraphServer";

const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// const data = []

// TaskModel.insertMany(data).then(console.log('Done!'))
let d1 = {
    "diffItem": {
        "updateTime": 1598574367, 
        "type": "Update", 
        "updatedFields": [
            {
                "fieldName": "qaFeatureOwner", 
                "newValue": "", 
                "oldValue": null
            }
        ]
    }, 
    "jiraItem": {
        "priority": "P00", 
        "status": "Implementing", 
        "jiraType": "Epic", 
        "jiraName": "PSI 41: SAR Support for FSCK/Recovery", 
        "qaRepresentative": null, 
        "functionalTest": "Yes", 
        "fixVersion": "PSI_41", 
        "jiraId": "TRIES-41773", 
        "jiraParentId": "TRIF-842"
    }, 
    "qcItem": {
        "status": "In Progress", 
        "requirementType": "Epic", 
        "requirementId": "2244"
    }
}

function deleteArrays(){
  const d2 = JSON.parse(JSON.stringify(d1));
  const task = new TaskModel(d2)
  console.log(task)
   // let arr = [];
  //  data.map((item,))
}
deleteArrays();

const userRouter = require('./routing/users');
app.use("/api/users", userRouter);

const statusRouter = require('./routing/status');
app.use("/api/status", statusRouter);

const analyticsRouter = require('./routing/analytics');
app.use("/api/analytics", analyticsRouter);

const bellaRouting = require('./routing/bellaRouting');
app.use("/api/PostBellaData", bellaRouting);

app.listen(4000, () => { console.log("App is Listening to 4000") })
