const express = require('express');
const router = express.Router();
const {userLogin, addSubUser, userForgotPassword, userUploadImage} = require('../controllers/Users.js');

const FileUpload = require('../helpers/FileUpload');

//importing middlewares
const auth = require("../middlewares/auth");

router.get('/login',userLogin);
router.get('/add-sub-user',auth,addSubUser);
router.post('/forgot-password',userForgotPassword);
router.post('/file-upload',FileUpload.single('image'),userUploadImage)

module.exports = router;