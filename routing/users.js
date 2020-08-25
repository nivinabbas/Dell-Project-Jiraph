const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema)

var nodemailer = require('nodemailer')
var validator = require("email-validator");

const u = new UserModel({
    userInfo: {
        employeeName: "yousef",
        employeeEmail: "yousef@gmail.com",
        employeeRole: "admin",
        password: "111"
    }
})

//app.get/post/put/delete => router.get/post/put/delete
router.post('/login',(req,res)=>{
    const {email , password} = req.body;
    if(validator.validate(email)){
    UserModel.find({"userInfo.employeeEmail":email}).then(checkEmail=>{
        if(checkEmail.length>0){
            UserModel.find({"userInfo.employeeEmail":email,"userInfo.password":password}).then(checkPassword=>{
                if(checkPassword.length>0){
                    res.send({success:true,error:"",info:{role:checkPassword[0].userInfo.employeeRole}})
                }else{
                    res.send({success:false,error:"Password incorrect",info:null})
                }
            })
        }else{
            res.send({success:false,error:"Email not found",info:null})
        }
        
    })
}else{
    res.send({success:false,error:"Email is not Valid",info:null})
}
 })

 router.get('/getUsersList',(req,res)=>{
     UserModel.find({}).then(users=>{
        //  if(users.length>0){
        //      let table = [];
        //      users.map((item,index)=>{
        //          item[index]
        //      })
        //     //  res.send({success:true,error:null,info:{users})
        //  }
     })
 })


 router.post('/forgotPassword',(req,res)=>{
     const { email } = req.body;
     if(validator.validate(email)){
     UserModel.find({"userInfo.useremployeeEmail":email}).then(checkEmail=>{
         console.log(checkEmail)
        if(checkEmail.length>0){
            if(validator.validate(email)){
                const key = makeid(10)
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'servicetest468@gmail.com',
                      pass: 'mxzmxz123'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'servicetest468@gmail.com',
                    to: 'ramiayoub12123@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: 'That was easy!'+ key
                  };
                  
                  transporter.sendMail(mailOptions, function(err, info){
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                res.send({success:true,error:null,info:{key:key}})
                
            }else{
                res.send({success:true,error:"Email is not valid",info:{key:key}})

            }
        }else{
            res.send({success:false,error:"Email not found",info:null})
        }
     })
    }else{
        res.send({success:false,error:"Email not valid",info:null})
    }
 })

//  router.post('/getUserInfo',(req,res)=>{
//      const { email } = req.body
//      User.find({employeeEmail:email}).then(docs=>{
//          console.log(docs)
//      })
//  })


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

module.exports = router;

