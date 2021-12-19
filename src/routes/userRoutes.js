const express = require('express');
const userControllers = require('../controllers/userControllers');
const { authenticateToken, validateUserInfo } = require('../utils/validators');
const router = express.Router();

// GET user's info
router.get('/', authenticateToken, userControllers.getUserInfo);

// POST EDIT ROUTES
router.post('/edit/info', validateUserInfo, authenticateToken, userControllers.editUserInfo);
router.post('/edit/email', authenticateToken, userControllers.editUserEmail);
router.post('/edit/password', authenticateToken, userControllers.editUserPassword);

router.post('/delete', authenticateToken, userControllers.deleteUser);

module.exports = router;