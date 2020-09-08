const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
const port=process.env.PORT ||4000;
//const TaskModel = require('./schemas/TaskSchema');

const TaskModel = require('./schemas/TaskSchema');



app.use(express.static('public'))

//  const url = "mongodb+srv://nimer:N1N1N1N1@cluster0.tejcy.mongodb.net/server";
const url = "mongodb+srv://Marshood:raMHdQuDOBxwrcss@cluster0.ifcjp.mongodb.net/jira";

const mongoose = require('mongoose');
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

 


//updateSaleh()
//updating the time in diffitem
function updateSaleh() {
    let tasks = TaskModel.find({}).then(
        data => {
            data.map((item, index) => {
                let id = item._id;
               
                let date = randomDate(new Date('08/15/2020'), new Date('08/31/2020'));
                console.log(item.diffItem.updatedTime)
                TaskModel.updateOne(
                    { _id: id },
                    { $set: { "diffItem.updatedTime": date } }
                )
            })
        }
    )
}



function randomDate(start, end /*, startHour, endHour*/) {
    var date = new Date(+start + Math.random() * (end - start));
    // var hour = startHour + Math.random() * (endHour - startHour) | 0;
    // date.setHours(hour);
    // console.log(date)
    return date;
}


 


app.listen(port, () => {
    console.log("App is Listening to port:",port)
})


