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
        if(users.length>0){
            let table = [];
            for (let index = 0; index < users.length; index++) {
                table.push({email:users[index].userInfo.employeeEmail,name:users[index].userInfo.employeeName,role:users[index].userInfo.employeeRole,id:users[index]._id})
            }
            
            res.send({success:true,error:null,info:{table}})
        }
     })
 })

 router.delete('/deleteUse',(req,res)=>{
    const {id} = req.body;
    console.log(id)

 })




 router.post('/forgotPassword',(req,res)=>{
     const { email } = req.body;
     if(validator.validate(email)){
        UserModel.find({"userInfo.employeeEmail":email}).then(checkEmail=>{
           if(checkEmail.length>0){
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
                       to: email,
                       subject: 'Reset Password',
                       text: 'Your Key Is: '+ key
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
               res.send({success:false,error:"Email not found",info:null})
           }
        })
       }else{
           res.send({success:false,error:"Email not valid",info:null})
       }
 })

//  router.post('/getUserInfo',(req,res)=>{
//     const { email } = req.body;
//     if(validator.validate(email)){
//        UserModel.findOne({"userInfo.employeeEmail":email}).then(checkEmail=>{
//           if(checkEmail.length>0){
                  
//                   res.send({success:true,error:null,info:{email:checkEmail[0].userInfo.employeeEmail,name:checkEmail[0].userInfo.employeeName,role:checkEmail[0].userInfo.employeeRole,id:checkEmail[0]._id}})
                  
//           }else{
//               res.send({success:false,error:"Email not found",info:null})
//           }
//        })
//       }else{
//           res.send({success:false,error:"Email not valid",info:null})
//       }
// })

router.post('/createUser',(req,res)=>{
    const { name , email , role , password} = req.body;
    if(validator.validate(email)){
        UserModel.find({"userInfo.employeeEmail":email}).then(checkEmail=>{
          if(checkEmail.length>0){
                res.send({success:false,error:"Email is already in use",info:null})          
          }else{
            UserModel.insertMany({userInfo:{employeeName:name,employeeEmail:email,employeeRole:role,password:password}})
            UserModel.find({}).then(users=>{
                if(users.length>0){
                    let table = [];
                    for (let index = 0; index < users.length; index++) {
                        table.push({email:users[index].userInfo.employeeEmail,name:users[index].userInfo.employeeName,role:users[index].userInfo.employeeRole,id:users[index]._id})
                    }
                    
                    
                }
             })
             res.send({success:true,error:null,info:{table}})
          }
       })
      }else{
          res.send({success:false,error:"Email not valid",info:null})
      }
})

router.post('/editUser',(req,res)=>{
    const { newName, newEmail, newRole, newPassword} = req.body;
    
    if(validator.validate(newEmail)){


        UserModel.find({"userInfo.employeeEmail":newEmail}).then(checkEmail=>{
          if(checkEmail.length>0){
            UserModel.find({"userInfo.employeeEmail":newEmail}).then(checkUserEmail=>{
                  if(checkUserEmail.length>0){
                      
                    UserModel.update(
                        {$set:
                            {userInfo:
                                {employeeName:newName,
                                    employeeEmail:newEmail,
                                    employeeRole:newRole,
                                    password:newPassword
                                }
                            }
                        })
                        .then(res.send({success:true,error:null,info:null}))
                  }else{
                    res.send({success:false,error:"Email is already in use",info:null})  
                  }
              })        
          }else{
            UserModel.update(
                {_id:id},{$set:
                    {userInfo:
                        {employeeName:newName,
                            employeeEmail:newEmail,
                            employeeRole:newRole,
                            password:newPassword
                        }
                    }
                })
                .then(res.send({success:true,error:null,info:null}))
              
          }
       })
      }else{
          res.send({success:false,error:"Email not valid",info:null})
      }
})


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

