const express = require('express');
const router = express.Router();

const { createToken } = require('../controllers/Tokens.js');

router.route('/').post(createToken);

module.exports = router;