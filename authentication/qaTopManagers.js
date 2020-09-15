var secret = require("../index")
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    const { loginToken } = req.cookies;
    const decodedToken = await jwt.verify(loginToken, secret);
    if (decodedToken.role == "QA manager" || decodedToken.role == "TOP manager") {
        next();
    } else {
        return res.status(403).send("permission denied.only QA Manager Or Top Manager user can have access!");
    }

}