const jwt = require('jsonwebtoken');
const passport = require("passport");

const AuthStrategy = (req, res, next) => {
    const auth = passport.authenticate("user-jwt", async function(err, user) {
        if(err){
           console.log(err);
           return res.status.send("Internal server Error.");
        }

        if(!user) return res.status(401).send("Unauthenticated User."); 

        req.logIn(user, { session: false }, function(error) {
            if(error) return next(error);
            next();
        });
    });
    auth(req, res, next)
} 

module.exports.AuthStrategy = AuthStrategy;



const verifyToken = (req, res, next) => {
    const token = req.headers['access-token'];
    if(!token) return res.status(403).send("Authentication failed.");
    try{
        const decoded = jwt.verify(token, "iamatiq");
        req.user = decoded;
        next();
    }
    catch(err){
       console.log(err)
       return res.status(401).send("Invalid token.");
    }
}

// module.exports = verifyToken;