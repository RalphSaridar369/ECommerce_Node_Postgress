const jwt = require("jsonwebtoken");
const messages = require("../helpers/Messages");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message:messages[403],
      error:"A token is required for authentication"
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message:messages[401],
      error:"Invalid Token"
    });
  }
  return next();
};

module.exports = verifyToken;