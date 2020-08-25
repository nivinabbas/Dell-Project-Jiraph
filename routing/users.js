const express = require("express");
const router = express.Router();


//app.get/post/put/delete => router.get/post/put/delete
router.post('/login',(req,res)=>{
    const {email , password} = req.body
    UserModel.find({employeeEmail:email}).then(checkEmail=>{
        if(checkEmail.length>0){
            UserModel.find({employeeEmail:email,password:password}).then(checkPassword=>{
                if(checkPassword.length>0){
                    res.send({success:true,error:"",info:null})
                }else{
                    res.send({success:false,error:"Password incorrect",info:null})
                }
            })
        }else{
            res.send({success:false,error:"Email not found",info:null})
        }
    })
})

module.exports = router;

