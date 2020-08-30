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



const userRouter = require('./routing/users');
app.use("/api/users", userRouter);

const statusRouter = require('./routing/status');
app.use("/api/status", statusRouter);

const analyticsRouter = require('./routing/analytics');
app.use("/api/analytics", analyticsRouter);

const bellaRouting = require('./routing/bellaRouting');
app.use("/api/PostBellaData", bellaRouting);

app.listen(4000, () => { console.log("App is Listening to 4000") })
