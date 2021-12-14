const express = require('express');
const authController = require('../controllers/authControllers');
const { validateUserRegister, validateUserLogin } = require('../utils/validators');

const router = express.Router();

// POST Register
router.post('/register', validateUserRegister, authController.register);
// POST Login
router.post('/login', validateUserLogin, authController.login);

module.exports = router;