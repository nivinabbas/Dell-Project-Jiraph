const jwt = require("jsonwebtoken");
var secret = require("../index");
module.exports = async (req, res, next) => {
  const { loginToken } = req.cookies;
  if (!loginToken) return res.status(401).send("no token was Provided");

  try {
    const decodedToken = await jwt.verify(loginToken, secret);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send("Invalid token");
  }
};
