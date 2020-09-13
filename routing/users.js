const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
const saltRounds = 10
 

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
        UserModel.find({ "userInfo.employeeEmail": email }).then(async checkEmail => {
            if (checkEmail.length > 0) {
                const isMatch = await bcrypt.compare(password,checkEmail[0].userInfo.password)
                if(isMatch){
                    if(checkEmail[0].active == true){
                        return (res.send({ success: true, error: null, info: { role: checkEmail[0].userInfo.employeeRole, id: checkEmail[0]._id } }))
                    }else{
                        return (res.send({ success: false, error: "User is deleted from the system", info: null }))
                    }
                }else{
                    return (res.send({ success: false, error: "Password incorrect", info: null }))
                }
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
                table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id , active:users[index].active })
            }

            res.send({ success: true, error: null, info: { table } })
        }
    })
})

router.put('/deleteUser', (req, res) => {

    const { id } = req.body;
    let table = [];
    UserModel.findOne({ _id: id }, async function (err, docs) {
        if (err) {
            return (res.send({ success: false, error: err, info: null }))
        }
        else {
            if (docs) {
                docs.active = false;
                await docs.save();
                await UserModel.find({ }).then(users => {
                    if (users.length > 0) {

                        for (let index = 0; index < users.length; index++) {
                            table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id , active:users[index].active })
                        }
                        res.send({ success: true, error: null, info: { table } })
                    }
                })
            } else {
                return (res.send({ success: false, error: 'user not found', info: null }))
            }
        }
    })

})




router.post('/forgotPassword', (req, res) => {
    const { email } = req.body;
    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email, active: true }).then(checkEmail => {
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
                        return (res.send({ success: false, error: err, info: null }))
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


router.post('/createUser', (req, res) => {

    const { name, email, role, password } = req.body;
    let table = [];
    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email }).then(async (checkEmail) => {
            if (checkEmail.length > 0) {
                return (res.send({ success: false, error: "Email is already in use", info: null }))
            }


            else {
                const salt = await bcrypt.genSalt(saltRounds)
                const hashpassword = await bcrypt.hash(password,salt)
                await UserModel.insertMany({ userInfo: { employeeName: name, employeeEmail: email, employeeRole: role, password: hashpassword }, active: true })

                await UserModel.find({  }).then(users => {
                    if (users.length > 0) {

                        for (let index = 0; index < users.length; index++) {
                            table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id , active:users[index].active })
                        }


                        var mailOptions = {
                            from: 'servicetest468@gmail.com',
                            to: email,
                            subject: 'Welcome To Jiraph!!',
                            text: `Hello ${name.charAt(0).toUpperCase() + name.slice(1)},Welcome to your new Jiraph Account. 

                            Sign in to your Jiraph Account to access Jira tasks and Analysis. 
                            
                            Your username: ${email}
                            
                            The Jiraph Team`
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                return (res.send({ success: false, error: err, info: null }))
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
    KeyModel.find({ employeeEmail: email, key: key }).then(docs => {
        docs.map((item, index) => {
            if (item.employeeEmail == email) {
                if (item.key == key) {
                    if ((Date.now() - item.keyTime) <= 1800000) {
                        return (res.send({ success: true, error: null, info: null }))
                    } else {
                        res.send({ success: false, error: 'time expired', info: null })
                    }
                } else {
                    res.send({ success: false, error: 'key is incorrect', info: null })
                }
            } else {
            }
        })
    })

})

router.put('/updatePassword', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ "userInfo.employeeEmail": email }).then(async docs => {
        if (docs) {
            // const name = docs.userInfo.employeeName
            // const role = docs.userInfo.employeeRole
            // const id = docs._id
            const salt = await bcrypt.genSalt(saltRounds)
            const hashpassword = await bcrypt.hash(password,salt)
            docs.userInfo.password = hashpassword
            docs.save();
            res.send({ success: true, error: null, info: null })
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
        UserModel.find({ _id: id }).then(async doc => {
            if(doc.length>0){
            if (email == doc[0].userInfo.employeeEmail) {
                if (password.length > 0) {
                    const salt = await bcrypt.genSalt(saltRounds)
                    const hashpassword = await bcrypt.hash(password,salt)
                    doc[0].userInfo.password = hashpassword;
                }
                doc[0].userInfo.employeeName = name
                doc[0].userInfo.employeeRole = role
                await doc[0].save();

                return (res.send({ success: true, error: null, info: null }))
            
            }
            else {
                UserModel.find({ "userInfo.employeeEmail": email }).then(async docs => {
                    if (docs.length>0) {
                        return (res.send({ success: false, error: "Email is already in use", info: null }))
                    }
                    else {
                        if (password.length > 0) {
                            const salt = await bcrypt.genSalt(saltRounds)
                            const hashpassword = await bcrypt.hash(password,salt)
                            doc[0].userInfo.password = hashpassword;
                        }
                        doc[0].userInfo.employeeEmail = email
                        doc[0].userInfo.employeeName = name
                        doc[0].userInfo.employeeRole = role
                        await doc[0].save();
                        res.send({ success: true, error: null, info: null })
                    }
                })
            }
        }else{
            res.send({ success: false, error: 'User Not Found', info: null })
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

