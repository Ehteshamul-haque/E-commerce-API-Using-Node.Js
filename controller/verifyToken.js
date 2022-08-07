const jwt = require("jsonwebtoken");

// Simple Way but not reusable
// const verifyTokenAndAuthorization = (req, res, next) => {
//   const authHeader = req.headers.token;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_KEY, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//     });
//     if (req.user.id === req.params.id || req.user.isAdmin) {

//       next();
//     } else {
//       res.status(403).json({'req.user':req.user.id,'req.params':req.params.id});
//     }
//   } else {
//     return res.status(401).json("Your are not authenticated");
//   }
// };


// By calling function inside a function and reusable

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token

    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token,process.env.JWT_KEY, (err,user) => {
            if(err) res.status(403).json("Token is not valid!")
            req.user = user
            next()
        })
    }else{
        return res.status(401).json("Your are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
         
            next()
        }else{
            res.status(403).json("You are not allowed to that!")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
  verifyToken(req,res,() => {
    
    if(req.user.isAdmin){
      next()
    }else{
      res.status(403).json("Your are not allowed only admin have access!")
    }
  })
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};
