/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if(req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, token) => {
      if(err)
        res.status(401).json({ you: 'shall not pass!' });
      else {
        req.token = token;
        next();
      }
    });
  } else {
    res.status(400).json({message: "no JSON token found"})
  }
};


// module.exports = {
//   validateUserInfo: (req, res, next) => {
//     if(req.body.username && req.body.username.length > 0 && req.body.password && req.body.password.length > 0)
//         next();
//     else
//         res.status(400).json({message: "missing or invalid user information"});
//   },  
//   restrictToUsers: (req, res, next) => {
//     if(req.headers.authorization) {
//       jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, token) => {
//         if(err)
//           res.status(401).json({message: "invalid token"});
//         else
//           next();
//       });
//     } else {
//       res.status(400).json({message: "no JSON token found"})
//     }
//   }  
// };