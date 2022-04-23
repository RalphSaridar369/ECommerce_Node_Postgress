const messages = require("../helpers/Messages");

const isBuyer = (req, res, next) => {
    if(req.user.userType != 1){
        res.status(403).json({
            message:messages[403],
            error:"User must be logged in as buyer"
        })
    }
    return next();
};

module.exports = isBuyer;