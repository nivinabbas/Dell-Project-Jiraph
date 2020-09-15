var secret = require("../index")
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    const { loginToken } = req.cookies;
    const decodedToken = await jwt.verify(loginToken, secret);
    if (decodedToken.role !== "Admin")
        return res.status(403).send("permission denied.only admin user can have access!");

    next();
}