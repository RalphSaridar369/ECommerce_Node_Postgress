const express = require('express');
const router = express.Router();
const {userLogin, addSubUser} = require('../controllers/Users.js');

//importing middlewares
const auth = require("./middleware/auth");

router.get('/login',userLogin)
router.get('/add-sub-user',auth,addSubUser)

module.exports = router;