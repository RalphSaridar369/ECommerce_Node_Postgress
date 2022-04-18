const express = require('express');
const router = express.Router();
const {
    userLogin,
    userSignup,
    userForgotPassword,
    userChangePassword,
    userVerifyForgotPassword
} = require('../controllers/Users.js');

const FileUpload = require('../helpers/FileUpload');

//importing middlewares
const auth = require("../middlewares/auth");

router.post('/login',userLogin);
router.post('/signup',userSignup)
router.post('/forgot-password',userForgotPassword);
router.post('/verify-forgot-password',userVerifyForgotPassword)
router.put('/reset-password',userChangePassword);

module.exports = router;