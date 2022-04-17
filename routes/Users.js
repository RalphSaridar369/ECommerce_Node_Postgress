const express = require('express');
const router = express.Router();
const {userLogin, addSubUser} = require('../controllers/Users.js');

router.get('/login',userLogin)
router.get('/add-sub-user',addSubUser)

module.exports = router;