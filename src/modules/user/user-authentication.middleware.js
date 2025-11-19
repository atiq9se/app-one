const jwt = require('jsonwebtoken');
const passport = require("passport");

const AuthStrategy = (req, res, next )=> (
   passport.authenticate("user-jwt", async function(err, user, info){
    if(err){
        console.log(err);
        return res.status.send("Internal server Error.");
    }
    if(!user) return; 
    req.logIn(user, {session: false }, function (error){
        if(error) return next(error);
        next();
    })
    {
        try{
            const refreshTokenFromCookie = req.signedCookies["refresh_token"];
            if(!refreshTokenFromCookie) throw new Error();
            const payload = jwt.verify(refreshTokenFromCookie, "iamatiq")
        }
        catch(err){

        }
    }
   })
)(req, res, next);



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

module.exports = verifyToken;