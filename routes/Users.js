const express = require('express');
const router = express.Router();
const {userLogin, addSubUser, userForgotPassword} = require('../controllers/Users.js');

//importing middlewares
const auth = require("../middlewares/auth");

router.get('/login',userLogin)
router.get('/add-sub-user',auth,addSubUser)
router.post('/forgot-password',userForgotPassword)

module.exports = router;