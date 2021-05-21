
const jwt = require('jsonwebtoken');

let checkAuth = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
    return  res.status(401).json({error: err, message: "Auth fail"});
    } else {
     var decoded = jwt.verify(token, "itIsMySecretKeyDEV#Secret#Agent$$$$");
     req.user =decoded;
      next();
    }

    } catch(err){
       res.status(401).json({error: err, message: "Auth fail"});
    }
}

exports.checkAuth = checkAuth;