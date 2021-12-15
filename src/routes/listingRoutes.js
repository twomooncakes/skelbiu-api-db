const express = require('express');
const listingController = require('../controllers/listingControllers');
const router = express.Router();
const { upload } = require('../utils/multerHelper');
const { authenticateToken, validateNewListing } = require('../utils/validators');

// POST listing
router.post('/new', validateNewListing, authenticateToken, upload.single('mainImage'), listingController.addListing);

router.post('/favorite/:listingId', authenticateToken, listingController.favoriteListing);

router.get('/all', listingController.getListings);

router.get('/all/authed', authenticateToken, listingController.getListings);
router.get('/user-listings', authenticateToken, listingController.getUserListings);

module.exports = router;