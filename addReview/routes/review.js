const express = require('express');

const router = express.Router();

const reviewController = require('../controllers/review');

router.post('/add-review', reviewController.addReview);

router.post('/search-company', reviewController.searchCompany);

module.exports = router;