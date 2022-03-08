const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers["x-access-token"];

  console.log(token);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    if (err) {
      console.log(err);
      res.json({ status: 401, err: err });
    } else {
      console.log("DECODE", decode);
      req.id = decode.userId;
      req.email = decode.email;
      next();
    }
  });
};

module.exports = auth;
