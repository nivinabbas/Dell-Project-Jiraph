var secret = require("../index")
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    const { loginToken } = req.cookies;
    const decodedToken = await jwt.verify(loginToken, secret);
    if (decodedToken.role !== "TOP manager")
        return res.status(403).send("permission denied.only QA Manager user can have access!");

    next();
}