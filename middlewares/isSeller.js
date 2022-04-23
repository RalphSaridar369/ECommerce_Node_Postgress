const messages = require("../helpers/Messages");

const isSeller = (req, res, next) => {
    if(req.user.userType != 2){
        res.status(403).json({
            message:messages[403],
            error:"User must be logged in as seller"
        })
    }
    return next();
};

module.exports = isSeller;