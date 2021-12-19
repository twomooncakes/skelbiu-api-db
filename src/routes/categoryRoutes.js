const express = require('express');
const categoryController = require('../controllers/categoryControllers');
const router = express.Router();

router.get('/', categoryController.getCategories);

module.exports = router;