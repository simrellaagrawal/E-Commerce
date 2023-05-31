require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken = req.body.token;
  //   console.log(authToken);
  if (!authToken) return res.status(401).json("token is null");
  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json("token is not valid");
    }
    req.user = user;
    // console.log(user);
    next();
    //   console.log(err);
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user);
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(401).json("you are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdminAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("you are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdminAuthorization
};
