const express = require('express');
const userControllers = require('../controllers/userControllers');
const { authenticateToken } = require('../utils/validators');
const router = express.Router();

// GET user's info
router.get('/', authenticateToken, userControllers.getUserInfo);

// POST EDIT ROUTES
router.post('/edit/info', authenticateToken, userControllers.editUserInfo);
router.post('/edit/credentials', authenticateToken, userControllers.editUserInfo);

module.exports = router;