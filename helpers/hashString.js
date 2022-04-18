const bcrypt = require('bcrypt');

const hashString =(string)=>{
    const saltRounds = 10;
    let hashed;
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(string, salt, function(err, hash) {
            console.log(hash)
            hashed = hash
        });
    });
    return hashed;
}

module.exports = {
    hashString
}