const express = require('express');
const router = express.Router();

const { createUser, getUserDetails, isLoggedIn } = require('../controllers/Users.js');

router.route('/').post(createUser);

router.route('/:username').get(isLoggedIn, getUserDetails);

module.exports = router;