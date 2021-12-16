const express = require('express');
const userControllers = require('../controllers/userControllers');
const { authenticateToken } = require('../utils/validators');
const router = express.Router();

router.get('/', authenticateToken, userControllers.getUserInfo);

module.exports = router;