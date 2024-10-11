const express = require('express');
const router = express.Router();
const { addUser,getUsers, login }=require('../controller/user');
const authorize = require('../middleware/authorize');

router.post('/',addUser);

router.get('/',authorize,getUsers);

router.post('/login',login);

module.exports = router;