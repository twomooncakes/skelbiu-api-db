const express = require('express');
const authController = require('../controllers/authControllers');
const { validateUser } = require('../utils/validators');

const router = express.Router();

// GET Register & Login
router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);

module.exports = router;