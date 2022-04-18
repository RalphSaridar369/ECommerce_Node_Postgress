const express = require('express');
const router = express.Router();
const {
    userLogin,
    userSignup,
    userForgotPassword,
    userUploadImage
} = require('../controllers/Users.js');

const FileUpload = require('../helpers/FileUpload');

//importing middlewares
const auth = require("../middlewares/auth");

router.post('/login',userLogin);
router.post('/signup',userSignup)
router.post('/forgot-password',userForgotPassword);
router.post('/file-upload',FileUpload.single('image'),userUploadImage)

module.exports = router;