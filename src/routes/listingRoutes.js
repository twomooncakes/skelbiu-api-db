const express = require('express');
const listingController = require('../controllers/listingControllers');
const router = express.Router();
const { upload } = require('../utils/multerHelper');
const { authenticateToken, validateNewListing } = require('../utils/validators');

// POST /new - create new listing
router.post('/new', validateNewListing, authenticateToken, upload.single('mainImage'), listingController.addListing);

// POST favorite/unfavorite listing
router.post('/favorite/:listingId', authenticateToken, listingController.favoriteListing);
router.post('/unfavorite/:listingId', authenticateToken, listingController.unfavoriteListing);

// GET /all - gets all listings(authed gets additional info only available to logged in users)
router.get('/all', listingController.getListings);
router.get('/all/authed', authenticateToken, listingController.getListings);

// GET /user-listings - gets all listings of specified user
router.get('/user-listings', authenticateToken, listingController.getUserListings);

// GET /:listingId - gets listing and seller info by listing id
router.get('/:listingId', listingController.getSingleListing);

// POST /edit/:listingId - edits listing
router.post('/edit/:listingId', validateNewListing, authenticateToken, upload.single('mainImage'), listingController.editListing);

// POST /delete/:listingId - archives listing 
router.post('/delete/:listingId', authenticateToken, listingController.deleteListing);

module.exports = router;