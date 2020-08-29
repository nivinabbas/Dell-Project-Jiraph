const express = require("express");
const router = express.Router();
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const TaskModel = require('./schemas/TaskSchema');

//app.get/post/put/delete => router.get/post/put/delete



router.post('/api/analytics/modificationByField', async (req, res) => {
    const { fieldName, values, label,qaRepresentative} = req.body;
    if(fieldName.length == 0 ){
        let tasks = await TaskModel.aggregate([
            { $match: {}},
            {$group: {_id:null , fieldNames: "$diffItem.updatedField.fieldName"}}





        ])
    }
    res.send(tasks)
})


module.exports = router;

