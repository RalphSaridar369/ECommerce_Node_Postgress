const messages = require("../helpers/Messages");

const isAdmin = (req, res, next) => {
    if(req.user.userType != 3){
        res.status(403).json({
            message:messages[403],
            error:"User must be logged in as admin"
        })
    }
    return next();
};

module.exports = isAdmin;