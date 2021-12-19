const express = require('express');
const userControllers = require('../controllers/userControllers');
const { authenticateToken } = require('../utils/validators');
const router = express.Router();

// GET user's info
router.get('/', authenticateToken, userControllers.getUserInfo);

// POST EDIT ROUTES
router.post('/edit/info', authenticateToken, userControllers.editUserInfo);
router.post('/edit/email', authenticateToken, userControllers.editUserEmail);
// router.post('/edit/password', authenticateToken, userControllers.editUserPassword);

module.exports = router;