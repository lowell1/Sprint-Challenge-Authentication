const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("./auth-model");

router.post('/register', (req, res) => {
  // implement registration
  if(req.body.username && req.body.username.length > 0 && req.body.password && req.body.password.length > 0) {
    req.body.password = bcrypt.hashSync(req.body.password, 14);
    
    authModel.addUser(req.body)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
  } else {
    res.status(400).json({message: "missing or invalid user information"});
  }
});

const genLoginToken = user => {
  console.log("jwt_secret=",process.env.JWT_SECRET);
  return jwt.sign(
      {
          subject: user.id,
          department: user.department,
          username: user.username
      },
      process.env.JWT_SECRET,
      {
          expiresIn: "1d"
      }
  );
}

router.post('/login', (req, res) => {
  // implement login
  authModel.getUser(req.body.username)
  .then(user => {
    if(user && bcrypt.compareSync(req.body.password, user.password))
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token: genLoginToken(user)
      });
    else
      res.sendStatus(401).json({message: "invalid login credentials"});
  })
  .catch(error =>{console.log(error); res.sendStatus(500)});
});

module.exports = router;
