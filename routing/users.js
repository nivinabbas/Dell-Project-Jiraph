const express = require("express");
const router = express.Router();
const User = require('../schemas/UserSchema')
var nodemailer = require('nodemailer')
var validator = require("email-validator");




//app.get/post/put/delete => router.get/post/put/delete
router.post('/login',(req,res)=>{
    const {email , password} = req.body;
    console.log('email ', email)
    User.find({employeeEmail:email}).then(checkEmail=>{
        if(checkEmail.length>0){
            User.find({employeeEmail:email,password:password}).then(checkPassword=>{
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
 router.post('/forgotPassword',(req,res)=>{
     const { email } = req.body
     User.find({employeeEmail:email}).then(checkEmail=>{
        if(checkEmail.length>0){
            if(validator.validate(email)){
                const key = makeid(10)
                res.send({success:true,error:null,info:{key:key}})
                
            }else{
                res.send({success:true,error:"Email is not valid",info:{key:key}})

            }
        }else{
            res.send({success:false,error:"Email not found",info:null})
        }
     })
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

