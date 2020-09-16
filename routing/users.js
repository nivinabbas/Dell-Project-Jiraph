const express = require("express");
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");


const UserSchema = require('../schemas/UserSchema');
const KeySchema = require('../schemas/KeySchema');
const AuditSchema = require('../schemas/AuditSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const KeyModel = mongoose.model("KeyModel", KeySchema);
const AuditModel = mongoose.model("AudetModel", AuditSchema);

var nodemailer = require('nodemailer')
var validator = require("email-validator");

var secret = require("../index")
const auth = require("../authentication/auth"); 
const admin = require("../authentication/admin");
const audit = require("../authentication/audit");


const saltRounds = 10

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servicetest468@gmail.com',
        pass: 'mxzmxz123'
    }
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email }).then(async checkEmail => {
            if (checkEmail.length > 0) {
                const isMatch = await bcrypt.compare(password, checkEmail[0].userInfo.password)
                if (isMatch) {
                    if (checkEmail[0].active == true) {
                        const token = await jwt.sign({
                            name: checkEmail[0].userInfo.employeeName,
                            username: checkEmail[0].userInfo.employeeEmail,
                            role: checkEmail[0].userInfo.employeeRole,
                        },
                            secret
                        );
                        AuditModel.insertMany({
                            id:checkEmail[0]._id,
                            employeeName: checkEmail[0].userInfo.employeeName,
                            employeeEmail: checkEmail[0].userInfo.employeeEmail,
                            employeeRole: checkEmail[0].userInfo.employeeRole,
                            action: 'Login',
                            body:req.body,
                            timeChange: Date.now()
                        })
                        res.cookie("loginToken", token, {
                            maxAge: 120000,
                        });
                        res.send({ success: true, error: null, info: { role: checkEmail[0].userInfo.employeeRole, id: checkEmail[0]._id } })
                        res.end();

                    } else {
                        return (res.send({ success: false, error: "User is deleted from the system", info: null }))
                    }
                } else {
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

router.get('/getUsersList', [auth, admin, audit], (req, res) => {
    UserModel.find({ active: true }).then(async users => {
        if (users.length > 0) {
            let table = [];
            for (let index = 0; index < users.length; index++) {
                table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id, active: users[index].active })
            }
            res.send({ success: true, error: null, info: { table } })
        }
        else {
            res.send({ success: false, error: "No Users found", info: null })
        }
    })
})

router.get('/getDeactivatedList', [auth, admin, audit], (req, res) => {
    UserModel.find({ active: false }).then(async users => {
        if (users.length > 0) {
            let table = [];
            for (let index = 0; index < users.length; index++) {
                table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id, active: users[index].active })
            }
            res.send({ success: true, error: null, info: { table } })
        }
    })
})

router.put('/deleteUser', [auth, admin, audit], (req, res) => {

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
                await UserModel.find({ active: true }).then(async users => {
                    if (users.length > 0) {

                        for (let index = 0; index < users.length; index++) {
                            table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id, active: users[index].active })
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


router.post('/createUser', [auth, admin, audit], (req, res) => {

    const { name, email, role, password } = req.body;
    const passwqord = req.body.password;
    let regex = /[^A-Za-z0-9]/;
    let containSepcChars = regex.test(password);

    let table = [];
    if (!containSepcChars) {
    if (validator.validate(email)) {
        UserModel.find({ "userInfo.employeeEmail": email }).then(async (checkEmail) => {
            if (checkEmail.length > 0) {
                return (res.send({ success: false, error: "Email is already in use", info: null }))
            }

            else {
                const salt = await bcrypt.genSalt(saltRounds)
                const hashpassword = await bcrypt.hash(password, salt)
                await UserModel.insertMany({ userInfo: { employeeName: name, employeeEmail: email, employeeRole: role, password: hashpassword }, active: true })

                await UserModel.find({ active: true }).then(async users => {
                    if (users.length > 0) {

                        for (let index = 0; index < users.length; index++) {
                            table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id, active: users[index].active })
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
} else {
    res.send({ success: false, error: "No Special Characters or White Space allowed in User Password!", info: null })
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
    const passwqord = req.body.password;
    let regex = /[^A-Za-z0-9]/;
    let containSepcChars = regex.test(password);
    if (!containSepcChars) {
    UserModel.findOne({ "userInfo.employeeEmail": email }).then(async docs => {
        if (docs) {
            const salt = await bcrypt.genSalt(saltRounds)
            const hashpassword = await bcrypt.hash(password, salt)
            docs.userInfo.password = hashpassword
            docs.save();
            res.send({ success: true, error: null, info: null })

        } else {
            res.send({ success: false, error: "email not valid", info: null })
        }

        UserModel.findOne({ "userInfo.employeeEmail": email }).then(async docs => {
            if (docs) {
                // const name = docs.userInfo.employeeName
                // const role = docs.userInfo.employeeRole
                // const id = docs._id
                const salt = await bcrypt.genSalt(saltRounds)
                const hashpassword = await bcrypt.hash(password, salt)
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
}
else {
        res.send({ success: false, error: "No Special Characters or White Space allowed in User Password!", info: null })
    }

})

router.put('/editUser', [auth, admin, audit], (req, res) => {
    const { id, name, email, role, password } = req.body;
    const passwqord = req.body.password;
    let regex = /[^A-Za-z0-9]/;
    let containSepcChars = regex.test(password);
    if (!containSepcChars) {
    if (validator.validate(email)) {
        UserModel.find({ _id: id }).then(async doc => {
            if (doc.length > 0) {
                if (email == doc[0].userInfo.employeeEmail) {
                    if (password.length > 0) {
                        const salt = await bcrypt.genSalt(saltRounds)
                        const hashpassword = await bcrypt.hash(password, salt)
                        doc[0].userInfo.password = hashpassword;
                    }
                    doc[0].userInfo.employeeName = name
                    doc[0].userInfo.employeeRole = role
                    await doc[0].save();

                    return (res.send({ success: true, error: null, info: null }))

                }
                else {
                    UserModel.find({ "userInfo.employeeEmail": email }).then(async docs => {
                        if (docs.length > 0) {
                            return (res.send({ success: false, error: "Email is already in use", info: null }))
                        }
                        else {
                            if (password.length > 0) {
                                const salt = await bcrypt.genSalt(saltRounds)
                                const hashpassword = await bcrypt.hash(password, salt)
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
            } else {
                res.send({ success: false, error: 'User Not Found', info: null })
            }
        })
    } else {
        res.send({ success: false, error: "Email not valid", info: null })
    }
}else {
        res.send({ success: false, error: "No Special Characters or White Space allowed in User Password!", info: null })
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

router.put('/activeUser', [auth, admin, audit], (req, res) => {
    const { id } = req.body
    let table = []
    UserModel.find({ _id: id }).then(async doc => {
        if (doc.length > 0) {
            doc[0].active = true
            await doc[0].save();
            await UserModel.find({ active: false }).then(users => {
                if (users.length > 0) {

                    for (let index = 0; index < users.length; index++) {
                        table.push({ email: users[index].userInfo.employeeEmail, name: users[index].userInfo.employeeName, role: users[index].userInfo.employeeRole, id: users[index]._id, active: users[index].active })
                    }
                }
            })
            return (res.send({ success: true, error: null, info: { table } }))
        }
        else {
            return (res.send({ success: false, error: 'User Not Found in DB', info: null }))
        }
    })
})

router.get('/getUsersAudit', [auth,admin,audit],(req,res)=>{
    AuditModel.find({ }).then(async users => {
        if (users.length > 0) {
            let table = [];
            for (let index = 0; index < users.length; index++) {
                table.push({ email:users[index].employeeEmail,name:users[index].employeeName,role:users[index].employeeRole,action:users[index].action,date:users[index].timeChange })
            }
            res.send({ success: true, error: null, info: { table } })
        }
        else {
            res.send({ success: false, error: "No Actions found", info: null })
        }
    })
})

module.exports = router;