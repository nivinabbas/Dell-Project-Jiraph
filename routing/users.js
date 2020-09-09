const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const UserSchema = require('../schemas/UserSchema');
const KeySchema = require('../schemas/KeySchema');
const AuditSchema = require('../schemas/AuditSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const KeyModel = mongoose.model("KeyModel", KeySchema);
const AuditModel = mongoose.model("AuditModel", AuditSchema);

var nodemailer = require('nodemailer')
var validator = require("email-validator");
const { find } = require("../schemas/TaskSchema");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servicetest468@gmail.com',
        pass: 'mxzmxz123'
    }
});

AuditModel.insertMany(
    {
        employeeName: 'rami',
        employeeEmail: 'rami@gmail.com',
        employeeRole: 'Admin',
        change: 'Login',
        timeChange: '1'
    }
)


const u = new UserModel({
    userInfo: {
        employeeName: "yousef",
        employeeEmail: "yousef@gmail.com",
        employeeRole: "admin",
        password: "111"
    }
})

//app.get/post/put/delete => router.get/post/put/delete
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email }).then(checkEmail => {
            if (checkEmail.length > 0) {
                UserModel.find({ "userInfo.employeeEmail": email, "userInfo.password": password }).then(checkPassword => {
                    if (checkPassword.length > 0) {
                        res.send({ success: true, error: "", info: { role: checkPassword[0].userInfo.employeeRole } })
                    } else {
                        res.send({ success: false, error: "Password incorrect", info: null })
                    }
                })
            } else {
                res.send({ success: false, error: "Email not found", info: null })
            }

        })
    } else {
        res.send({ success: false, error: "Email is not Valid", info: null })
    }
})

router.get('/getUsersList', (req, res) => {
    UserModel.find({}).then(users => {
        if (users.length > 0) {
            let table = [];
            for (let index = 0; index < users.length; index++) {
                table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id })
            }

            res.send({ success: true, error: null, info: { table } })
        }
    })
})

router.delete('/deleteUser', (req, res) => {

    const { id } = req.body;
    console.log(id)
    let table = [];
    UserModel.remove({ _id: id }, async function (err) {
        if (err) {
            res.send({ success: false, error: err, info: null })
        } else {
            await UserModel.find({}).then(users => {
                if (users.length > 0) {

                    for (let index = 0; index < users.length; index++) {
                        table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id })
                    }
                    res.send({ success: true, error: null, info: { table } })
                }
            })
        }
    })

})




router.post('/forgotPassword', (req, res) => {
    const { email } = req.body;
    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email }).then(checkEmail => {
            if (checkEmail.length > 0) {
                const key = makeid(10)

                var mailOptions = {
                    from: 'servicetest468@gmail.com',
                    to: email,
                    subject: 'Reset Password',
                    text: `You requested to reset your password. 
Please copy the code below to continue the password reset process:  
                    
${key}`
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                KeyModel.insertMany(
                    {
                        employeeEmail: email,
                        keyTime: Date.now(),
                        key: key
                    }
                )
                res.send({ success: true, error: null, info: { key: key } })

            } else {
                res.send({ success: false, error: "Email not found", info: null })
            }
        })
    } else {
        res.send({ success: false, error: "Email not valid", info: null })
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

router.post('/createUser', (req, res) => {

    const { name, email, role, password } = req.body;
    let table = [];

    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email }).then(async (checkEmail) => {
            if (checkEmail.length > 0) {
                res.send({ success: false, error: "Email is already in use", info: null })
            }


            else {
                await UserModel.insertMany({ userInfo: { employeeName: name, employeeEmail: email, employeeRole: role, password: password } })

                await UserModel.find({}).then(users => {
                    if (users.length > 0) {

                        for (let index = 0; index < users.length; index++) {
                            table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id })
                        }


                        var mailOptions = {
                            from: 'servicetest468@gmail.com',
                            to: email,
                            subject: 'Reset Password',
                            text: `Hello ${name.charAt(0).toUpperCase() + name.slice(1)},Welcome to your new Jiraph Account. 

                            Sign in to your Jiraph Account to access Jira tasks and Analysis. 
                            
                            Your username: ${email}
                            
                            The Jiraph Team`
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        res.send({ success: true, error: null, info: { table } })
                    }
                })
            }


        })
    } else {
        res.send({ success: false, error: "Email not valid", info: null })
    }
})

router.post('/checkSendedPassword', (req, res) => {
    const { email, key } = req.body;
    console.log(key, email)
    KeyModel.find({ employeeEmail: email, key: key }).then(docs => {
        console.log(docs)
        docs.map((item, index) => {
            console.log("this is item :" + item)
            if (item.employeeEmail == email) {
                console.log("email is good")
                if (item.key == key) {
                    if ((Date.now() - item.keyTime) <= 1800000) {
                        console.log("okay")
                        return res.send({ success: true, error: null, info: null })
                    } else {
                        console.log("true")
                        res.send({ success: false, error: 'time expired', info: null })
                    }
                } else {
                    console.log("incorrect")
                    res.send({ success: false, error: 'key is incorrect', info: null })
                }
            } else {
                console.log('ss')
            }
        })
    })

})

router.put('/updatePassword', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ "userInfo.employeeEmail": email }).then(docs => {
        if (docs) {
            // const name = docs.userInfo.employeeName
            // const role = docs.userInfo.employeeRole
            // const id = docs._id
            docs.userInfo.password = password
            docs.save();
            // UserModel.updateOne({ _id: id }, { $set: { userInfo: { employeeName: name, employeeEmail: email, employeeRole: role, password: password } } }).then(doc => {
            //     if (doc.n > 0) {
            //         res.send({ success: true, error: null, info: null })
            //     } else {
            //         res.send({ success: false, error: null, info: null })
            //     }
            // })
        } else {
            res.send({ success: false, error: "email not valid", info: null })
        }

    })

})

router.put('/editUser', (req, res) => {
    const { id, name, email, role, password } = req.body;
    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email }).then(checkEmail => {
            if (checkEmail.length > 0) {
                UserModel.find({ "userInfo.employeeEmail": email }).then(checkUserEmail => {
                    if (checkUserEmail.length > 0) {
                        if(password.length>0){
                            checkUserEmail[0].userInfo.employeeEmail = email
                            checkUserEmail[0].userInfo.employeeName = name
                            checkUserEmail[0].userInfo.employeeRole = role
                            checkUserEmail[0].userInfo.password = password

                            checkUserEmail[0].save();
                            res.send({ success: true, error: null, info: null })
                        }
                        else{
                            checkUserEmail[0].userInfo.employeeEmail = email
                            checkUserEmail[0].userInfo.employeeName = name
                            checkUserEmail[0].userInfo.employeeRole = role

                            checkUserEmail[0].save();
                            res.send({ success: true, error: null, info: null })
                        }
                    } else {
                        res.send({ success: false, error: "Email is already in use", info: null })
                    }
                })
            } else {
                UserModel.find({ _id: id }).then(checkUserId => {
                    if(checkUserId.length>0){
                if(password.length>0){
                    checkUserId[0].userInfo.employeeEmail = email
                    checkUserId[0].userInfo.employeeName = name
                    checkUserId[0].userInfo.employeeRole = role
                    checkUserId[0].userInfo.password = password

                    checkUserId[0].save();
                    res.send({ success: true, error: null, info: null })
                }
                else{
                    checkUserId[0].userInfo.employeeEmail = email
                    checkUserId[0].userInfo.employeeName = name
                    checkUserId[0].userInfo.employeeRole = role

                    checkUserId[0].save();
                    res.send({ success: true, error: null, info: null })
                }
            }
            else{
                res.send({ success: false, error: 'User Not Found', info: null })
            }
                })
            }
        
        })
    } else {
        res.send({ success: false, error: "Email not valid", info: null })
    }
})


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = router;

