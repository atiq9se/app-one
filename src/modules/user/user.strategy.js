const passport = require("passport");
const { Strategy } = require("passport-jwt");

module.exports = function () {
    function cookieExtractor (req) {
        let token = null;
        if(req && req.signedCookies) token = req.signedCookies["access-token"];
        return token; 
    }
}