const express = require("express");
const router = express.Router();


//app.get/post/put/delete => router.get/post/put/delete
router.post('/login',(req,res)=>{
    const {email , password} = req.body
    UserModel.find({employeeEmail:email}).then(checkEmail=>{
        if(checkEmail.length>0){
            
        }
    })
})

module.exports = router;

