let jwt = require('jsonwebtoken');
let jwt_secret = "vikasishere";

let getuserdetails = (req, res, next) => {

    const token = req.header('auth-token')
     if(!token){
        res.status(401).send({error:"enter valid toke"})
     }
     let data = jwt.verify(token, jwt_secret)
     req.user = data.user;
    next()
}


module.exports = getuserdetails;