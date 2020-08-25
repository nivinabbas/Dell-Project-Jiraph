const express = require("express");
const router = express.Router();
let newDwata = [];

async function addTaskItem(lst) {
    await lst.map((item, index) => {
        item.diffItem.updateTime = new Date(item.diffItem.updateTime)
        item.taskItem =
        {
            user: null,
            isDone: false,
            updatedTime: new Date(),
            createdTime: new Date()
        }
    })
}

router.post("/GetBellaData", async function (req, res) {

    const { user_id, user_pass, Data } = req.body;
    if (req.body.key == "QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN") {
        console.log("true" + Data)
        newDwata = Data;
        addTaskItem(newDwata);
        // Task.insertMany(newDwata);
        printData()
        res.send({ "success": "ture" });
    } else {
        (console.log("false"))
        res.send({ "success": "false" });
    };
});
// to check the new data 
function printData() {
    console.log("printData:- ");
    // console.log(newDwata);
    console.log("newDwata:- ");

    newDwata.forEach(element => {
        console.log(element)

    });
}
console.log("aaaa" + newDwata);




module.exports = router;

